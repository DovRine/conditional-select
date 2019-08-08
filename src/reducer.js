import Swal from "sweetalert2/dist/sweetalert2.js";

export const initialState = []
const _actions = {
    'ADD_CONDITION': (state, action) => {
        const {groupIdx} = action.payload
        const currentGroup = state.conditionGroups[groupIdx];
        // if no more unique conditions, show a warning
        if(state.allConditions.length <= currentGroup.conditions.length){
            Swal.fire({
                title: 'Notice',
                text: 'No more conditions available to select',
                type: 'info',
                confirmButtonText: 'Got it'
            })
            return state
        }

        // if the prior condition has an end operator, force the user to change it before continuing
        if(currentGroup.conditions.length){
            if(currentGroup.conditions[currentGroup.conditions.length - 1].operator === 'end'){
                Swal.fire({
                    title: 'Invalid Configuration',
                    text: 'No new conditions can be added after an End operator',
                    type: 'error',
                    confirmButtonText: 'OK'
                })
                return state
            }
            
            // if the prior condition has not been set, force the user to set it before continuing
            if(currentGroup.conditions[currentGroup.conditions.length - 1].value === -1){
                Swal.fire({
                    title: 'Invalid Condition',
                    text: 'The previous condition must be set before adding another',
                    type: 'error',
                    confirmButtonText: 'OK'
                })
                return state
            }
        }

        // add a condition
        const newState = {...state}
        newState.conditionGroups[groupIdx].conditions.push({value: -1, operator: 'end'})
        return newState
    },
    'ADD_GROUP': state => {
        if(state.conditionGroups.length){
            const priorGroup = {...state.conditionGroups[state.conditionGroups.length -1]}

            // if the prior group has an end operator, force the user to change it before continuing
            if(priorGroup.operator === 'end'){
                Swal.fire({
                    title: 'Invalid Configuration',
                    text: 'No new groups can be added after an End operator',
                    type: 'error',
                    confirmButtonText: 'OK'
                })
                return state
            }
            // if the prior group's last condition is not set, force the user to set it before continuing
            if(
                !priorGroup.conditions.length ||
                priorGroup.conditions[priorGroup.conditions.length -1].value === -1
            ){
                Swal.fire({
                    title: 'Invalid Configuration',
                    text: 'The last group must have a condition before you can add a new group',
                    type: 'error',
                    confirmButtonText: 'OK'
                })
                return state
            }
        }
        const newState = { ...state };
        newState.conditionGroups.push({
            conditions: [],
            operator: 'end'
        })
        // console.log(newState)
        return newState
    },
    'SET_CONDITION': (state, action) => {
        const {groupIdx, conditionIdx, value} = action.payload
        const newState = {...state}
        const condition = newState.conditionGroups[groupIdx].conditions[conditionIdx] 
        condition.value = value
        condition.gid = groupIdx    // probably unnecessary
        condition.cid = conditionIdx
        return newState
    },
    'SET_CONDITION_OPERATOR': (state, action) => {
        const {groupIdx, conditionIdx, operator} = action.payload
        const newState = {...state}
        const currentConditions = newState.conditionGroups[groupIdx].conditions
        currentConditions[conditionIdx].operator = operator
        // if operator === end, delete all following conditions in this group
        if(operator === 'end'){
            if(currentConditions.length -1 > conditionIdx){
                Swal.fire({
                    title: "Warning!",
                    text: "If you continue all conditions in this group after this one will be removed. Are you sure?",
                    type: "warning",
                    confirmButtonText: "Yes",
                    showCancelButton: true
                }).then(result => {
                    if(result.value){
                        // TOFIX
                    }
                });
                newState.conditionGroups[groupIdx].conditions = currentConditions.slice(0, conditionIdx + 1)
                return newState
            }
        }else{
            return newState
        }
    },
    'SET_GROUP_OPERATOR': (state, action) => {
        const newState = {...state}
        const {groupIdx, operator} = action.payload
        state.conditionGroups[groupIdx].operator = operator
        return newState
    },
}
export const reducer = (state, action) => {
    if(action.type in _actions){
        return _actions[action.type](state, action)
    }else{
        return state
    }
}