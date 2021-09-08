import React from 'react'

import * as Redux from 'redux'
import { Box } from '@material-ui/core'
import { DAGRE_CONFIG, INITIAL_TRANSFORM, NODE_SIZE } from './config'
import { Dataset, Job } from '../../types/api'
import { GraphEdge, Node as GraphNode, graphlib, layout } from 'dagre'
import { HEADER_HEIGHT } from '../../helpers/theme'
import { IState } from '../../store/reducers'
import { JobOrDataset, MqNode } from './types'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'
import { Zoom } from '@visx/zoom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchLineage, setSelectedNode } from '../../store/actionCreators'
import { generateNodeId } from '../../helpers/nodes'
import { localPoint } from '@visx/event'
import Edge from './components/edge/Edge'
import MqEmpty from '../core/empty/Empty'
import MqText from '../core/text/MqText'
import Node from './components/node/Node'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

const BOTTOM_OFFSET = 8

const styles = (theme: Theme) => {
  return createStyles({
    lineageContainer: {
      marginTop: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px - ${BOTTOM_OFFSET}px)`
    }
  })
}

const MIN_ZOOM = 1 / 4
const MAX_ZOOM = 4
const DOUBLE_CLICK_MAGNIFICATION = 1.1

const MAX_ITERATIONS = 1000

interface StateProps {
  jobs: Job[]
  datasets: Dataset[]
  selectedNode: string
}

interface LineageState {
  graph: graphlib.Graph<MqNode>
  edges: GraphEdge[]
  nodes: GraphNode<MqNode>[]
}

interface DispatchProps {
  setSelectedNode: typeof setSelectedNode
  fetchLineage: typeof fetchLineage
}

type JorD = Job | Dataset | undefined

export interface JobOrDatasetMatchParams {
  nodeName: string
  namespace: string
  nodeType: string
}

type LineageProps = WithStyles<typeof styles> &
  StateProps &
  DispatchProps &
  RouteComponentProps<JobOrDatasetMatchParams>

let g: graphlib.Graph<MqNode>

class Lineage extends React.Component<LineageProps, LineageState> {
  constructor(props: LineageProps) {
    super(props)
    this.state = {
      graph: g,
      edges: [],
      nodes: []
    }
  }

  componentDidMount() {
    const nodeName = this.props.match.params.nodeName
    const namespace = this.props.match.params.namespace
    const nodeType = this.props.match.params.nodeType
    if (nodeName && namespace && nodeType) {
      const nodeId = generateNodeId(
        this.props.match.params.nodeType.toUpperCase() as JobOrDataset,
        this.props.match.params.namespace,
        this.props.match.params.nodeName
      )
      this.props.setSelectedNode(nodeId)
      this.props.fetchLineage(
        this.props.match.params.nodeType.toUpperCase() as JobOrDataset,
        this.props.match.params.namespace,
        this.props.match.params.nodeName
      )
    }
  }

  componentDidUpdate(prevProps: Readonly<LineageProps>) {
    if (this.props.selectedNode !== prevProps.selectedNode && this.props.selectedNode) {
      if (this.props.jobs.length > 0 || this.props.datasets.length > 0) {
        this.initGraph()
        const attachedNodes = this.findNodesFromOrigin(this.props.selectedNode)
        this.buildGraphAll(
          attachedNodes.filter(jobOrDataset => jobOrDataset && 'outputs' in jobOrDataset) as Job[],
          attachedNodes.filter(
            jobOrDataset => jobOrDataset && 'sourceName' in jobOrDataset
          ) as Dataset[]
        )
      }
    }
  }

  initGraph = () => {
    g = new graphlib.Graph<MqNode>({ directed: true })
    g.setGraph(DAGRE_CONFIG)
    g.setDefaultEdgeLabel(() => {
      return {}
    })
  }

  buildGraphAll = (jobs: Job[], datasets: Dataset[]) => {
    // jobs
    for (let i = 0; i < jobs.length; i++) {
      g.setNode(jobs[i].id.name, {
        data: jobs[i],
        width: NODE_SIZE,
        height: NODE_SIZE
      })
    }

    // datasets
    for (let i = 0; i < datasets.length; i++) {
      g.setNode(datasets[i].id.name, {
        data: datasets[i],
        width: NODE_SIZE,
        height: NODE_SIZE
      })
    }

    // edges
    for (let i = 0; i < jobs.length; i++) {
      for (let j = 0; j < jobs[i].outputs.length; j++) {
        g.setEdge(jobs[i].id.name, jobs[i].outputs[j].name)
      }
      for (let j = 0; j < jobs[i].inputs.length; j++) {
        g.setEdge(jobs[i].inputs[j].name, jobs[i].id.name)
      }
    }
    layout(g)

    this.setState({
      graph: g,
      edges: g.edges().map(e => g.edge(e)),
      nodes: g.nodes().map(v => g.node(v))
    })
  }

  /**
   * Runs a bidirectional depth first search on an origin node
   * It has some defensive practices which will protect against inf loops for some graphs
   */
  findNodesFromOrigin = (node: string): JorD[] => {
    const stack: JorD[] = []
    const items: JorD[] = []

    const root =
      this.props.jobs.find(job => job.name === node) ||
      this.props.datasets.find(dataset => dataset.name === node)
    if (root) {
      stack.push(root)
      items.push(root)
    }
    let i = 0
    while (stack.length > 0 && i < MAX_ITERATIONS) {
      const n = stack.pop()
      // job node
      if (n && 'outputs' in n) {
        const outputDatasets = n.outputs.map(output =>
          this.props.datasets.find(d => d.name === output.name)
        )
        const inputDatasets = n.inputs.map(output =>
          this.props.datasets.find(d => d.name === output.name)
        )
        const merged = [...inputDatasets, ...outputDatasets]
        const filtered = merged.filter(inputOrOutput => !items.includes(inputOrOutput))
        items.push(...filtered)
        stack.push(...filtered)
      }
      // dataset node
      else if (n && 'sourceName' in n) {
        const inputDatasets = this.props.jobs.filter(job => job.inputs.some(e => e.name === n.name))
        const outputDatasets = this.props.jobs.filter(job =>
          job.outputs.some(e => e.name === n.name)
        )
        const merged = [...inputDatasets, ...outputDatasets]
        const filtered = merged.filter(inputOrOutput => !items.includes(inputOrOutput))
        items.push(...filtered)
        stack.push(...filtered)
      }
      i++
    }
    return items
  }

  render() {
    const { classes } = this.props
    return (
      <Box className={classes.lineageContainer}>
        {this.props.selectedNode === null && (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={2}>
            <MqEmpty title={'No node selected'}>
              <MqText subdued>
                Try selecting a node through search or the jobs or datasets page.
              </MqText>
            </MqEmpty>
          </Box>
        )}
        {this.state.graph && (
          <ParentSize>
            {parent => (
              <Zoom
                width={parent.width}
                height={parent.height}
                scaleXMin={MIN_ZOOM}
                scaleXMax={MAX_ZOOM}
                scaleYMin={MIN_ZOOM}
                scaleYMax={MAX_ZOOM}
                transformMatrix={INITIAL_TRANSFORM}
              >
                {zoom => {
                  return (
                    <Box position='relative'>
                      <svg
                        id={'GRAPH'}
                        width={parent.width}
                        height={parent.height}
                        style={{
                          cursor: zoom.isDragging ? 'grabbing' : 'grab'
                        }}
                      >
                        <rect
                          width={parent.width}
                          height={parent.height}
                          fill={'transparent'}
                          onTouchStart={zoom.dragStart}
                          onTouchMove={zoom.dragMove}
                          onTouchEnd={zoom.dragEnd}
                          onMouseDown={event => {
                            zoom.dragStart(event)
                          }}
                          onMouseMove={zoom.dragMove}
                          onMouseUp={zoom.dragEnd}
                          onMouseLeave={() => {
                            if (zoom.isDragging) zoom.dragEnd()
                          }}
                          onDoubleClick={event => {
                            const point = localPoint(event) || {
                              x: 0,
                              y: 0
                            }
                            zoom.scale({
                              scaleX: DOUBLE_CLICK_MAGNIFICATION,
                              scaleY: DOUBLE_CLICK_MAGNIFICATION,
                              point
                            })
                          }}
                        />
                        <g transform={zoom.toString()}>
                          {this.state.nodes.map(node => (
                            <Node
                              key={node.data.name}
                              node={node}
                              edgeEnds={this.state.edges.map(
                                edge => edge.points[edge.points.length - 1]
                              )}
                              selectedNode={this.props.selectedNode}
                            />
                          ))}
                          <Edge edgePoints={this.state.edges} />
                        </g>
                      </svg>
                    </Box>
                  )
                }}
              </Zoom>
            )}
          </ParentSize>
        )}
      </Box>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  jobs: state.jobs.result,
  datasets: state.datasets.result,
  selectedNode: state.lineage.selectedNode
})

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators(
    {
      setSelectedNode: setSelectedNode,
      fetchLineage: fetchLineage
    },
    dispatch
  )

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Lineage))
)
