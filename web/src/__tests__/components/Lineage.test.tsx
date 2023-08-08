// Copyright 2018-2023 contributors to the Marquez project
// SPDX-License-Identifier: Apache-2.0

import { getSelectedPaths, initGraph, buildGraphAll } from '../../components/lineage/Lineage'
import { LineageNode, MqNode } from '../../components/lineage/types'
import { graphlib } from 'dagre'

class MockEdge {
  origin: string
  destination: string

  constructor(origin, destination) {
    this.origin = origin
    this.destination = destination
  }
}

class MockNode implements Partial<LineageNode> {
  id: string
  inEdges: MockEdge[]
  outEdges: MockEdge[]

  constructor(id, [prev, next]: [string | null, string | null]) {
    this.id = id
    this.inEdges = prev ? [new MockEdge(prev, id)] : ([] as MockEdge[])
    this.outEdges = next ? [new MockEdge(id, next)] : ([] as MockEdge[])
  }
}

const mockGraphWithCycle = [
  new MockNode('1', ['3', '2']),
  new MockNode('2', ['1', '3']),
  new MockNode('3', ['2', '1'])
] as LineageNode[]

const mockGraphWithoutCycle = [
  new MockNode('1', [null, '2']),
  new MockNode('2', ['1', '3']),
  new MockNode('3', ['2', null])
] as LineageNode[]

describe('Lineage Component', () => {
  const selectedNode = '1'
  let graphWithCycle: graphlib.Graph<MqNode>

  beforeEach(() => {
    graphWithCycle = initGraph()
    buildGraphAll(
      graphWithCycle,
      mockGraphWithCycle,
      true,
      selectedNode,
      (gResult: graphlib.Graph<MqNode>) => {
        graphWithCycle = gResult
      }
    )
  })

  it("doesn't follow cycles in the lineage graph", () => {
    const paths = getSelectedPaths(graphWithCycle, selectedNode)

    const pathCounts = paths.reduce((acc, p) => {
      const pathId = p.join(':')
      acc[pathId] = (acc[pathId] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    expect(Object.values(pathCounts).some(c => c > 2)).toBe(false)
  })

  it('renders a valid cycle', () => {
    const actualPaths = getSelectedPaths(graphWithCycle, selectedNode)

    const expectedPaths = [
      ['1', '2'],
      ['2', '3'],
      ['3', '2'],
      ['2', '1']
    ]

    expect(actualPaths).toEqual(expectedPaths)
  })
})
