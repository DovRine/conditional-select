import React, {useContext} from 'react'
import {ConditionalSelectContext} from './ConditionalSelect.jsx'
import {Input} from 'reactstrap'
import {setCondition, setConditionOperator} from './actions'
import './Condition.css'
const uuidv4 = require('uuid/v4')


export const Condition = ({ 
    conditionIdx,
    groupIdx,
}) => {
    const ctx = useContext(ConditionalSelectContext)
    const {dispatch, state} = ctx
    return (
    <div className="Condition">
        <Input 
            type="select"
            value={state.conditionGroups[groupIdx].conditions[conditionIdx].value} 
            onChange={e => {
                dispatch(setCondition(groupIdx, conditionIdx, e.currentTarget.value))
            }
        }>
            <option value={-1}>Select...</option>
            {state.allConditions.map(condition => {
                const disabled = state.conditionGroups[groupIdx].conditions.find(i => i.value === condition.value) ? true: false
                return (
                    <option 
                        key={uuidv4()} 
                        value={condition.value} 
                        disabled={disabled}
                    >
                        {condition.name}
                    </option>
                )
            })}
        </Input>
        <Input 
            type="select"
            value={state.conditionGroups[groupIdx].conditions[conditionIdx].operator} 
            onChange={e => {
                dispatch(setConditionOperator(groupIdx, conditionIdx, e.currentTarget.value))
            }}
        >
            <option value="end">End</option>
            <option value="and">And</option>
            <option value="or">Or</option>
        </Input>
    </div>
    );
};