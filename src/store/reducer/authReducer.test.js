import authReducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';


describe('auth Reducer', () => {
    it("should return intial state", () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        });
    });
    it("should return login state", () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }, {
            type:actionTypes.AUTH_STARTED,
            userId:"hemaUserId",
            token: "hemaToken"
        })).toEqual({
            token: "hemaToken",
            userId: "hemaUserId",
            error: null,
            loading: false,
            redirectPath: '/'
        });
    });
});