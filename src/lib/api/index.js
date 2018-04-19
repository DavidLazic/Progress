import config from 'constants/config';
import storage from 'constants/localStorage';

export default class Api {

    static get = (...args) => Api.httpRequest(Api.httpConfig('GET', ...args))
    static post = (...args) => Api.httpRequest(Api.httpConfig('POST', ...args))
    static put = (...args) => Api.httpRequest(Api.httpConfig('PUT', ...args))
    static delete = (...args) => Api.httpRequest(Api.httpConfig('DELETE', ...args))

    static headers = () => new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem(storage.TOKEN),
        'dataType': 'json'
    });

    /**
     * @description
     * Get HTTP request config.
     *
     * @param  {String} method
     * @param  {String} path
     * @param  {Object} props
     * @return {Function<Object>}
     * @private
     */
    static httpConfig = (method, path, props) =>
        new Request(`${config.BASE_PATH}${path}`, Object.assign({
            method,
            headers: Api.headers()
        }, props ? { body: JSON.stringify(props) } : null));

    /**
     * @description
     * Do a fetch HTTP request.
     *
     * @param  {Object} request
     * @return {Function<Object>}
     * @private
     */
    static httpRequest = request => fetch(request).then(res => res.json());
}
