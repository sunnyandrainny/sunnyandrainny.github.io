// import {createStore} from 'https://cdn.skypack.dev/redux';

//-----------------------MY REDUX----------------------------
function createStore(reducer){
    let state = reducer(undefined, {})
    const subscribers = []
    return {
        getState(){
            return state;
        },
        dispatch(action){
            state = reducer(state, action)
            subscribers.forEach(subscriber => subscriber())
        },
        subscribe (subscriber){
            subscribers.push(subscriber)
        }
    }
}


//-----------------------MY APP----------------------------
//reducer
function bankReducer(state = 0, action){
    switch(action.type){
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;
        default:
            return state;
    }
}

const store = window.store = createStore(bankReducer)

//actions
function actionDeposit(payload){
    return {
        type: 'DEPOSIT',
        payload
    }
}
function actionWithdraw(payload){
    return {
        type: 'WITHDRAW',
        payload
    }
}

//dom events
const deposit = document.querySelector('#deposit')
const withdraw = document.querySelector('#withdraw')

//event handler
deposit.onclick = function(){
    store.dispatch(actionDeposit(10))
}

withdraw.onclick = function(){
    store.dispatch(actionWithdraw(10))
}
//listener
store.subscribe(() => {
    render()
})

//render
function render(){
    const output = document.querySelector('#output')
    output.innerText = store.getState()
}

render()