// SPDX-License-Identifier: Apache-2.0

import React, { ChangeEvent, FunctionComponent, SetStateAction, useEffect } from 'react'

import * as Redux from 'redux'
import { Box, Chip, Tab, Tabs } from '@material-ui/core'
import { Dataset, DatasetVersion } from '../../types/api'
import { IState } from '../../store/reducers'
import {
  Theme as ITheme,
  WithStyles as IWithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'
import { LineageDataset } from '../lineage/types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchDataset,
  resetDataset,
  fetchDatasetVersions,
  resetDatasetVersions
} from '../../store/actionCreators'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import DatasetColumnLineage from './DatasetColumnLineage'
import DatasetInfo from './DatasetInfo'
import DatasetVersions from './DatasetVersions'
import IconButton from '@material-ui/core/IconButton'
import MqText from '../core/text/MqText'

const styles = ({ spacing }: ITheme) => {
  return createStyles({
    root: {
      padding: `0 ${spacing(2)}px`
    },
    tagList: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    tag: {
      '&:not(:last-of-type)': {
        marginRight: spacing(1)
      }
    }
  })
}

interface StateProps {
  lineageDataset: LineageDataset
  versions: DatasetVersion[]
  dataset: Dataset
  versionsLoading: boolean
  isDatasetInit: boolean
}

interface DispatchProps {
  fetchDatasetVersions: typeof fetchDatasetVersions
  fetchDataset: typeof fetchDataset
  resetDatasetVersions: typeof resetDatasetVersions
  resetDataset: typeof resetDataset
}

type IProps = IWithStyles<typeof styles> & StateProps & DispatchProps

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const DatasetDetailPage: FunctionComponent<IProps> = props => {
  const { classes, fetchDatasetVersions, fetchDataset, resetDataset, resetDatasetVersions, versions, versionsLoading } = props
  const { root } = classes
  const history = useHistory()

  useEffect(() => {
    fetchDataset(props.lineageDataset.namespace, props.lineageDataset.name)
    fetchDatasetVersions(props.lineageDataset.namespace, props.lineageDataset.name)
  }, [props.lineageDataset.name])

  // unmounting
  useEffect(() => () => { 
    resetDataset()
    resetDatasetVersions()
  }, [])

  const [tab, setTab] = React.useState(0)
  const handleChange = (event: ChangeEvent, newValue: SetStateAction<number>) => {
    setTab(newValue)
  }

  const handleFetchDataset = () => {
    if(!props.isDatasetInit) {
      fetchDataset(props.lineageDataset.namespace, props.lineageDataset.name)
    }
    return true
  }

  if (versionsLoading) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress color='primary' />
      </Box>
    )
  }

  if (versions.length === 0) {
    return null
  }

  const firstVersion = versions[0]
  const { name, tags, description } = firstVersion

  return (
    <Box my={2} className={root}>
      <Box>
        {tags.length > 0 && (
          <ul className={classes.tagList}>
            {tags.map(tag => (
              <li key={tag} className={classes.tag}>
                <Chip size='small' label={tag} />
              </li>
            ))}
          </ul>
        )}
        <Box display={'flex'} justifyContent={'space-between'} mb={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} textColor='primary' indicatorColor='primary'>
              <Tab label='LATEST SCHEMA' {...a11yProps(0)} disableRipple={true} />
              <Tab label='VERSION HISTORY' {...a11yProps(1)} disableRipple={true} />
              <Tab label='COLUMN LINEAGE' {...a11yProps(2)} disableRipple={true} />
            </Tabs>
          </Box>
          <IconButton onClick={() => history.push('/datasets')}>
            <CloseIcon />
          </IconButton>
        </Box>
        <MqText heading font={'mono'}>
          {name}
        </MqText>
        <Box mb={2}>
          <MqText subdued>{description}</MqText>
        </Box>
      </Box>
      {tab === 0 && (
        <DatasetInfo
          datasetFields={firstVersion.fields}
          facets={firstVersion.facets}
          run={firstVersion.createdByRun}
        />
      )}
      {tab === 1 && <DatasetVersions versions={props.versions} />}
      {tab === 2 && handleFetchDataset() && <DatasetColumnLineage columnLineage={props.dataset.columnLineage} />}
    </Box>
  )
}

const mapStateToProps = (state: IState) => ({
  datasets: state.datasets.result,
  versions: state.datasetVersions.result.versions,
  dataset: state.dataset.result,
  versionsLoading: state.datasetVersions.isLoading,
  isDatasetInit: state.dataset.init,
})

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators(
    {
      fetchDatasetVersions: fetchDatasetVersions,
      fetchDataset: fetchDataset,
      resetDatasetVersions: resetDatasetVersions,
      resetDataset: resetDataset
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DatasetDetailPage))
