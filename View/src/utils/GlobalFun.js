import store from '@/store/index.js'
var Enumerable = require('linq')
export default {
	//注册全局公共方法
	install(Vue) {
		Vue.prototype.billState = {
			save: 0,
			audit: 1,
			invalid: -1
		}

		//是否为空对象，空字符串，null 等 
		Vue.prototype.getIsNull = function(value) {
			var str = value
			str = String(str)
			if (str == 'undefined' || str == 'null' || !str || !/[^\s]/.test(str)) {
				return true;
			} else {
				return false;
			}
		}


		Vue.prototype.queryUrl = function(variable) {
			var query = window.location.href
			var vars1 = query.split('?')
			if (vars1.length > 1) {
				var vars = vars1[1].split('&')
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split('=')
					if (pair[0] == variable) {
						return pair[1]
					}
				}
			}

			return false
		}

		String.prototype.signMix = function() {
			if (arguments.length === 0) return this;
			var param = arguments[0], str = this;
			if (typeof (param) === 'object') {
				for (var key in param)
					str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
				return str;
			} else {
				for (var i = 0; i < arguments.length; i++)
					str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
				return str;
			}
		}

		//显示值数据源item应该包含value和name属性,如果显示值不是name,则需要传入自定义的属性名到destination
		Vue.prototype.EnumFilter = function(source, item = [], destination, myValue) {
			for (var i = 0; i < item.length; i++) {
				if (!this.getIsNull(item[i])) {
					var value = myValue === undefined ? item[i].value : item[i][myValue]
					if (source === value) {
						return destination === undefined ? item[i].name : item[i][destination]
					}
				}
			}
			return source;
		}
		//用户专用,显示用户名
		Vue.prototype.UserFilter = function(source, item) {
			var message = Enumerable.from(item).firstOrDefault(t => t.id == source)
			if (message == null) {
				return source
			} else {
				return message.name;
			}
		}
		//抖动
		Vue.prototype.debounce = function(func, wait, immediate) {
			let timeout, args, context, timestamp, result
			const later = function() {
				console.log('触发', +new Date() - timestamp, timeout)
				// 距离上一次触发的时间间隔
				const last = +new Date() - timestamp
				// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
				if (last < wait && last > 0) {
					//是否等待时间间隔达到后调用防抖 加上条件判断防止时间间隔内连续触发多个定时任务
					if (timeout == null) timeout = setTimeout(later, wait - last)
				} else {
					timeout = null
					// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
					if (!immediate) {
						timestamp = +new Date()
						result = func.apply(context, args)
						if (!timeout) context = args = null
					}
				}
			}
			return later
		}

		//得到登录人信息
		// Vue.prototype.getUserAllMessage = async function () {
		//     if (this.getIsNull(this.$store.state.userMessage.userAllMessage)) {
		//         await this.$store.dispatch({
		//             type: 'userMessage/GetUserAllMessage'
		//         })
		//         let list = this.$store.state.userMessage.userAllMessage
		//         return list

		//     } else {
		//         let list = this.$store.state.userMessage.userAllMessage
		//         console.log(list)
		//         return list
		//     }

		// }

		//日期格式化，可以选择是否返回日期
		Vue.prototype.dateFormatter = function(str, isDate, noSecond) {
			var hasTime = isDate === true ? false : true
			var d = new Date(str);
			if (this.getIsNull(str)) {
				d = new Date();
			}
			var year = d.getFullYear();
			var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
			var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
			var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			if (hasTime === true) {
				return [year, month, day].join('-') + " " + (noSecond ? ([hour, minute].join(':')) : ([hour, minute, second].join(':')));
			} else {
				return [year, month, day].join('-');
			}
		}

		Vue.prototype.dateFormatterSerialNumber = function(str, isDate) {
			var hasTime = isDate === true ? true : false
			var d = new Date(str);

			if (this.getIsNull(str)) {
				var d = new Date();
			}

			var year = d.getFullYear();
			var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
			var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

			if (hasTime === false) {
				var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
				var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
				var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
				return year + month + day + hour + minute + second + "";
			} else {
				return year + month + day + "";
			}
		}
		Vue.prototype.dateForReport = function(str, isDate, type) {
			var hasTime = isDate === true ? false : true
			var d = new Date(str);
			if (this.getIsNull(str)) {
				d = new Date();
			}
			var year = d.getFullYear();
			var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
			var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
			var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			if (hasTime === true) {
				switch (type) {
					case 0:
						return [year, month, day].join('-') + " " + [hour, minute, second].join(':')
					case 1:
						return [year, month, day].join('/') + " " + [hour, minute, second].join(':')
					case 2:
						return year + ' 年 ' + month + ' 月 ' + day + ' 日 ' + [hour, minute, second].join(':')//hour + ' 时 ' + minute + ' 分 ' + second + ' 秒'
					case 3:
						return [year, month, day].join('-') + " " + [hour, minute].join(':')
					case 4:
						return [hour, minute, second].join(':')
					default:
						return [year, month, day].join('-') + " " + [hour, minute, second].join(':')
				}
			} else {
				switch (type) {

					case 0:
						return [year, month, day].join('-')
					case 1:
						return [year, month, day].join('/')
					case 2:
						return year + ' 年 ' + month + ' 月 ' + day + ' 日'
					default:
						return [year, month, day].join('-')
				}
			}
		}



		Vue.prototype.getEnumList = function(type) {
			let list = this.$store.state.bas.enum[type]
			return list
		}
		//分组
		Vue.prototype.GetEnumDes = function GetEnumDes(datas, value, label) {
			try {

				var s = Enumerable.from(datas).firstOrDefault(t => t.value == value);
				if (s != null) {
					if (label == null) {
						return s.label;
					} else {
						if (s[label] != null)
							return s[label]
						else
							return value
					}
				} else {
					return value
				}
			} catch (error) {
				return ''
			}
		}

		Vue.prototype.getName = function(id) {
			let list = this.$store.state.userMessage.userAllList
			let user = Enumerable.from(list).firstOrDefault(t => t.id == id);
			return user == null ? null : user.name
		}
		Vue.prototype.getLoginUser = function(Id) {
			// console.log(store.state)
			return store.state.user
			// if (this.getIsNull(this.$store.state.userMessage.userAllList)) {
			//     await this.$store.dispatch({
			//         type: 'userMessage/GetAllUserList'
			//     })
			//     let list = this.$store.state.userMessage.userAllList
			//     return Enumerable.from(list).firstOrDefault(t => t.id == Id);

			// } else {
			//     let list = this.$store.state.userMessage.userAllList
			//     return Enumerable.from(list).firstOrDefault(t => t.id == Id);
			// }
		}

		Vue.prototype.getConfig = function(code) {
			let list = this.$store.state.sysconfig.message
			var config = this.getIsNull(list) ? { value: undefined, isEnabled: false } : this.getIsNull(list.find(x => x.code == code)) ? { value: undefined, isEnabled: false } : list.find(x => x.code == code)

			return config
		}

		//this.getAim('User',2)  获取用户2的姓名
		//this.getAim('Config','BA01','value')  获取参数BA01的值
		//this.getAim('User',null)  获取当前用户
		//this.getAim('Tenant',null)  获取当前租户
		Vue.prototype.getAim = function(type, value, aim = 'name') {
			if (this.getIsNull(value)) {
				if (type == 'Tenant') return this.$store.state.session.tenant[aim]
				else if (type == 'User') return this.$store.state.session.user[aim]
			}
			var source = []
			var field = 'id'
			if (type == 'TestItem') {
				source = this.$store.state.bas.basEnum.TestItem
			}
			else if (type == 'Manufacturer') {
				source = this.$store.state.bas.basEnum.BaseManufacturer
			}
			else if (type == 'User') {
				source = this.$store.state.userMessage.userAllList
			}
			else if (type == 'config') {
				field = 'code'
				source = this.$store.state.sysconfig.message
			}
			if (this.getIsNull(source)) return ''
			var row = source.find(x => x[field] == value)
			return this.getIsNull(row) ? value : row[aim]
		}
		Vue.prototype.toFixed = function(value, num) {
			if (this.getIsNull(num)) return value
			return Number(value).toFixed(num)
		}
		Vue.prototype.getSerialNumber = function(hasEnd = true) {
			return this.dateFormatterSerialNumber(new Date(), true) + (hasEnd ? '01' : '')
		}
	}
}