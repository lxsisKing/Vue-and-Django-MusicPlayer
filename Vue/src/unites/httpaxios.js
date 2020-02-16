/* eslint-disable */
import qs from 'qs'
export default {
    post(that, url, postdata, success) {
        // that.$Spin.show()
        that.$axios.post(url, qs.stringify(postdata))
            .then(success)
            .catch(err => {
                console.log(err)
                that.$Modal.error({
                    title: '错误提示',
                    content: '很抱歉，网络请求失败，请稍后再试'
                })
            })
            .finally(() => {
                that.$Spin.hide()
            })
    },
    get(that, url, success) {
        // that.$Spin.show()
        that.$axios.get(url)
            .then(success)
            // .catch(err => {
                // console.log(err)
                // that.$Modal.error({
                //     title: '错误提示',
                //     content: '很抱歉，网络请求失败，请稍后再试'
                // })
            // })
            //.finally(() => {
                // that.$Spin.hide()
            //})
    }
}