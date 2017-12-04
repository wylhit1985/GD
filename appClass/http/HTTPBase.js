

export default class HTTPBase{

    /*
    * GET请求
    *
    * @param url
    * @param params
    * @param headers
    *
    * @return {Promise}
    * */
    static get(url, params, headers){
        if(params){
            let paramsArray = [];

            //获取 params 内所有的 key
            let paramsKeyArray = Object.keys(params);

            //通过 foreach 方法拿到数组中每个元素，将元素与参数的值进行拼接处理，并且放入 paramsArray 中
            paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));

            //网址拼接
            if(url.search(/\?/) === -1){//没有'？'
                url += '?' + paramsArray.join('&');
            }else{
                url += paramsArray.join('&');
            }
        }

        return new Promise((resolve, reject) => {
            fetch(url,{
                method:'GET',
                header: headers
            }).then((response) => response.json())
                .then((response) => {
                    resolve(response);
                }).catch((error) =>{
                    reject({status: -1})
            }).done();
        });
    }

    /*
* POST请求
*
* @param url
* @param params
* @param headers
*
* @return {Promise}
* */
    static post(url, params, headers){
        //初始化 FormData
        let formData = new FormData();

        if(params){
            //获取 params 内所有的 key
            let paramsKeyArray = Object.keys(params);

            //通过 foreach 方法拿到数组中每个元素，将元素与参数的值进行拼接处理，并且放入 paramsArray 中
            paramsKeyArray.forEach(key => formData.append(key,params[key]));
        }

        return new Promise((resolve, reject) => {
            fetch(url,{
                method:'POST',
                header: headers,
                body: formData,
            }).then((response) => response.json())
                .then((response) => {
                    resolve(response);
                }).catch((error) =>{
                reject({status: -1})
            }).done();
        });
    }
}

global.HTTPBase = HTTPBase;