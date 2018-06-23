import {
    LOAD_REALTY_PENDING,
    LOAD_REALTY_FULFILLED,
    LOAD_REALTY_REJECTED,
    LOAD_REALTY_ITEM_PENDING,
    LOAD_REALTY_ITEM_FULFILLED,
    LOAD_REALTY_ITEM_REJECTED,
    LOAD_OWN_REALTY_PENDING,
    LOAD_OWN_REALTY_FULFILLED,
    LOAD_OWN_REALTY_REJECTED
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    byId: {},
    items: null,
    ownItems: null,
    loadingItem: false,
    loadingItems: false,
    loadingOwn: false
}

const addById = (state, items) => {
    const obj = {}
    items.forEach(i => obj[i._id] = i)
    return {...state.byId, ...obj}
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_REALTY_PENDING: {
            return {...state, loadingItems: true}
        }

        case LOAD_REALTY_FULFILLED: {
            const items = action.payload.data
            return {
                ...state,
                byId: addById(state, items),
                loadingItems: false,
                items: items
            }
        }

        case LOAD_REALTY_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Список оголошень не вдалось завантажити')
            return {...state, loadingItems: false }
        }

        case LOAD_OWN_REALTY_PENDING: {
            return {...state, loadingOwn: true}
        }

        case LOAD_OWN_REALTY_FULFILLED: {
            const items = action.payload.data
            return {
                ...state,
                byId: addById(state, items),
                loadingOwn: false,
                ownItems: items
            }
        }

        case LOAD_OWN_REALTY_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Список своїх оголошень не вдалось завантажити')
            return {...state, loadingOwn: false }
        }

        case LOAD_REALTY_ITEM_PENDING: {
            return {...state, loadingItem: true}
        }

        case LOAD_REALTY_ITEM_FULFILLED: {
            const item = action.payload.data
            return {
                ...state,
                byId: {...state.byId, [item._id]: item},
                loadingItem: false
            }
        }

        case LOAD_REALTY_ITEM_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Оголошення не вдалось завантажити')
            return {...state, loadingItem: false }
        }

        default: {
            return state
        }
    }
}
