var Listener = (function(){
	var events = {},

	_getEventNameAndSP = function(eventName){
		var nameArr, nameSpace;

		if(!eventName || eventName === ''){
			throw "unknown event name";
		}

		nameArr = eventName.split('.');
		return{
			name: nameArr.pop(),
			nameSpace: nameArr.join('.')
		}
	},

	listenTo = function(eventName, callback){
		var eventName;

		if(!callback){
			throw "undefined callback";
		}

		eventName = _getEventNameAndSP(eventName);
		if(!events[eventName.name]) events[eventName.name] = [];
		
		events[eventName.name].push({
			'callback': callback,
			'nameSpace': eventName.nameSpace
		});
	},

	fireEvent = function(eventName, callback){
		var l,
			eventName = _getEventNameAndSP(eventName),
			eventArr = events[eventName.name],
			runCallback = function(predicate){
				if(eventArr && (l = eventArr.length) ){
					if(predicate && typeof predicate === 'function'){
						while(--l >= 0)
							if(predicate(eventArr[l]))
								eventArr[l].callback();
					}else{
						while(--l >= 0)
							eventArr[l].callback();
					}
				}
			};

			if(eventName.nameSpace && callback){
					runCallback(function(event){
						return event.nameSpace === eventName.nameSpace && 
							    eventArr[l].callback === callback;
					})

			} else if(eventName.nameSpace){
				runCallback(function(event){
						return event.nameSpace === eventName.nameSpace;
					});
			} else if(callback){
				runCallback(function(event){
					return event.callback === callback
				});
			} else {
				runCallback();
			}
	},

	removeEvent = function(eventName, callback){
		var eventArr;

		eventName = _getEventNameAndSP(eventName);
		eventArr = events[eventName.name];

		if(!eventName.nameSpace && !callback){
			delete events[eventName.name];
		} else if(eventArr && eventArr.length) {
			if(eventName.nameSpace && callback){
				events[eventName.name] = eventArr.filter(function(el){
					return el.nameSpace !== eventName.nameSpace && el.callback !== callback
				});

			}else if(eventName.nameSpace){
				events[eventName.name] = eventArr.filter(function(el){
					return el.nameSpace !== eventName.nameSpace
				});
			}else if(callback){
				events[eventName.name] = eventArr.filter(function(el){
					return  el.callback !== callback
				});
			} 

		}
	};

	return {
		listenTo: listenTo,
		fireEvent: fireEvent,
		removeEvent: removeEvent
	}
})();