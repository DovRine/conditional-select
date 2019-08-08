export const addCondition = groupIdx => ({
    type: 'ADD_CONDITION',
    payload: {groupIdx}
})
export const addGroup = () => ({
    type: "ADD_GROUP",
});
export const setCondition = (groupIdx, conditionIdx, value) => ({
    type: 'SET_CONDITION',
    payload: {groupIdx, conditionIdx, value}
})
export const setConditionOperator = (groupIdx, conditionIdx, operator) => ({
    type: 'SET_CONDITION_OPERATOR',
    payload: {groupIdx, conditionIdx, operator}
})
export const setGroupOperator = (groupIdx, operator) => ({
    type: 'SET_GROUP_OPERATOR',
    payload: {groupIdx, operator}
})