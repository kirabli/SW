
export default{
	// https://blog.csdn.net/lq313131/article/details/127091684
	install(Vue){
		var validatenull = function(val){
			if (typeof val === 'boolean') {
				return false
			}
			if (typeof val === 'number') {
				return false
			}
			if (val instanceof Array) {
				if (val.length == 0) return true
			} else if (val instanceof Object) {
				if (JSON.stringify(val) === '{}') return true
			} else {
				if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
				return false
			}
			return false
		}
		Vue.prototype.validatenull =  validatenull,
		Vue.prototype.validatenotnull =  function(val){  return !validatenull(val);}
	}

}