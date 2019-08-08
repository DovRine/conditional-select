import React, {useReducer} from 'react'
import {reducer} from './reducer'
import {addGroup} from './actions'
import {Button} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Group} from './Group.jsx'
import Swal from "sweetalert2/dist/sweetalert2.js";
import "bootstrap/dist/css/bootstrap.css";
import "sweetalert2/src/sweetalert2.scss";
import './ConditionalSelect.css'

const uuidv4 = require('uuid/v4')

export const ConditionalSelectContext = React.createContext()

const ConditionalSelect = ({name='', allConditions, conditionGroups}) => {
    conditionGroups = []
    const [state, dispatch] = useReducer(reducer, {
        allConditions,
        conditionGroups
    })
    const doAddGroup = () => {
        dispatch(addGroup())
    }
    const doShowHelp = () => {
        Swal.fire({
            title: 'Help',
            type: 'info',
            text: 'Add a new condition by setting the condition operator to "and" or "or"'
        })
    }
    return (
        <ConditionalSelectContext.Provider value={{state, dispatch}}>
            <div className="ConditionalSelect">
                <fieldset>
                    <header>
                            <Button color="primary" onClick={doAddGroup} title="Add Group">
                                <FontAwesomeIcon icon={faPlus} /> Add Group
                            </Button>
                            <Button color="info" onClick={doShowHelp}>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </Button>
                    </header>
                    {state.conditionGroups.length
                        ? state.conditionGroups.map((group, groupIdx) => (
                            <Group key={uuidv4()} group={group} groupIdx={groupIdx} />
                        ))
                        : null
                    }
                </fieldset>
            </div>
        </ConditionalSelectContext.Provider>
    )
}

export default ConditionalSelect