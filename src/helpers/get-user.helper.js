import jwt_decode from 'jwt-decode'

export const getUserJwt = (token) => {
    if (!token) {
        return {};
    }
    return jwt_decode(token);
}