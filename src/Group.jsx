import React, { useContext } from 'react'
import { ConditionalSelectContext } from './ConditionalSelect.jsx'
import { addCondition, setGroupOperator } from './actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Input } from 'reactstrap'
import { Condition } from './Condition.jsx'
import './Group.css'
const uuidv4 = require('uuid/v4')

export const Group = ({ group, groupIdx }) => {
    const ctx = useContext(ConditionalSelectContext)
    const { dispatch, state } = ctx
    const doAddCondition = () => dispatch(addCondition(groupIdx))
    return (
        <div className="Group">
            <Button color="primary" onClick={doAddCondition}>
                <FontAwesomeIcon color="primary" icon={faPlus} /> Add Condition
            </Button>
            {group.conditions.map((condition, conditionIdx) => (
                <Condition
                    key={uuidv4()}
                    {...condition}
                    conditionIdx={conditionIdx}
                    groupIdx={groupIdx}
                />
            ))}
            <div>
                <Input
                    type="select"
                    value={state.conditionGroups[groupIdx].operator}
                    onChange={e => {
                        dispatch(
                            setGroupOperator(groupIdx, e.currentTarget.value)
                        )
                    }}
                >
                    <option value="end">End</option>
                    <option value="and">And</option>
                    <option value="or">Or</option>
                </Input>
            </div>
        </div>
    )
}
