var meet = {
	init:function(){
		var _t = this;
		_t.config = meet_config;
		_t.channel = $('.meet-wrap').attr('data-channel');

		switch(_t.channel){
			case 'signcode': _t.signcode_fn(); break;
			case 'sign': _t.sign_fn();break;
			case 'welcome': _t.welcome_fn(); break;
			case 'index': _t.index_fn(); break;
			case 'expert': _t.expert_fn();break;
			case 'schedule': _t.schedule_fn(); break;
			case 'data': _t.data_fn();break;
			case 'ask': _t.ask_fn();break;
			case 'vote': _t.vote_fn(); break;
			case 'feedback': _t.feedback_fn();break;
			default:
			  return false;
		}
		$('.meet-back').click(function(){
			window.history.back(-1);
		});
	},
	getmeet_fn:function(_meetId){
		var _t = this;
		$.ajax({
		  	type: 'get',
		  	url: _t.config.url.meet,
		  	data: {meetId:_meetId},
		  	dataType: 'json',
		  	timeout: 300,
		  	success: function(data){
		    	if(data.code=='1'){
		    		$('.meet-sign-bg img').attr('src',data.attach.picPath);
		    		$('.meet-wel-bg img').attr('src',data.attach.letterPic);
		    		$('.meet-sche-sloganbig').text(data.attach.name);
					$('.meet-sche-slogansmall').text('——'+data.attach.theme);
					$('.meet-sche-station b').text(data.attach.meetAddr+' > 会议议程');
		    	}else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	signcode_fn:function(){
		var _t = this;
		var _top =0;
		var _dep = 100;
		var _code = [0,0,0];
		
		$('.meet-code-up').on('click',function(e){
			var $e = $(e.currentTarget);
			var _moveEle = $e.siblings('.meet-code-num').find('.meet-code-numico');
			_top = parseInt($(_moveEle).css('top'));
			if(_top == 0){
				$.dialog({
                    content : '已经是最小数字',
					title:'alert',
                    time : 2000
                });
                return false;
			}
			$(_moveEle).animate({top:(_top+_dep)+'px'}, 500,'ease-out');
			var _codeIndex = parseInt($e.parent().attr('data-index'));
			_code[_codeIndex]--;
		});
		$('.meet-code-down').on('click',function(e){
			var $e = $(e.currentTarget);
			var _moveEle = $e.siblings('.meet-code-num').find('.meet-code-numico');
			_top = parseInt($(_moveEle).css('top'));
			if(_top == -900){
				$.dialog({
                    content : '已经是最大数字',
					title:'alert',
                    time : 2000
                });
                return false;
			}
			$(_moveEle).animate({top:(_top-_dep)+'px'}, 500,'ease-out');
			var _codeIndex = parseInt($e.parent().attr('data-index'));
			_code[_codeIndex]++;
		});
		$('.meet-code-btn').on('swipeRight',function(){
			$.ajax({
			  	type: 'get',
			  	url: _t.config.url.signcode,
			  	data: {code:_code.join('')},
			  	dataType: 'json',
			  	timeout: 300,
			  	success: function(data){
			    	if(data.code=='1'){
			    		window.open('meet-sign.html?meetId='+data.attach.id,'_self');
			    	}else{
				    	$.dialog({
		                    content : '会议码签到失败！',
							title:'alert',
		                    time : 2000
	           			});
			    	}
			  	},
			  	error: function(){
			    	$.dialog({
	                    content : '会议码签到失败！',
						title:'alert',
	                    time : 2000
	       			 });
			  	}
			});
		});
	},
	sign_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		if(!_meetId){
			return false;
		}
		_t.getmeet_fn(_meetId);
		$('.meet-sign-btn').on('click',function(){
			if(!$('.meet-sign-text').val()){
				$.dialog({
                    content : '请输入您的名字，进行指纹验证',
					title:'alert',
                    time : 2000
                });
			}else{
				var _pername = encodeURIComponent($.trim($('.meet-sign-text').val()));
				$.ajax({
				  	type: 'get',
				 	url: _t.config.url.sign,
				  	data: {
						meetId:_meetId,
						perName:_pername
					},
				  	dataType: 'json',
				 	timeout: 300,
				  	success: function(data){
					    if(data.code=='1'){
					    	window.open('meet-welcome.html?meetId='+_meetId+'&userId='+data.attach.id,'_self');
					    }else{
					    	$.dialog({
			                    content : '签到失败！',
								title:'alert',
			                    time : 2000
	               			 });
					    }
				  	},
				  	error: function(){
				    	$.dialog({
		                    content : '签到失败！',
							title:'alert',
		                    time : 2000
		       			 });
				  	}
				});
			}
		});
	},
	welcome_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		var _userId = _t.getHrefParam('userId');
		if(!_meetId){
			return false;
		}
		_t.getmeet_fn(_meetId);
		
		$('.meet-wel-btn').on('swipeRight',function(){
			window.open('meet-index.html?meetId='+_meetId+'&userId='+_userId,'_self');
		});
	},
	index_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		var _userId = _t.getHrefParam('userId');
		if(!_meetId){
			return false;
		}
		_t.getmeet_fn(_meetId);
		$('.meet-menu-item a').each(function(_index,_element){

			$(_element).attr('href',$(_element).attr('href')+'?meetId='+_meetId+'&userId='+_userId);
		});
	},
	expert_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		$.ajax({
			type: 'get',
		 	url: _t.config.url.expert,
		  	data: {
				meetId:_meetId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '',dothtml='';

			    		$(data.attach).each(function(_index,_element){
			    			html += '<div class="swiper-slide"><p class="meet-expert-photo"><img src="'+_element.picUrl;
			    			html += '"></p><p class="meet-expert-name">'+_element.name;
			    			html += '</p><p class="meet-expert-from">'+_element.unit;
			    			html += '</p><p class="meet-expert-post">'+_element.office+' '+_element.jobs+'</p>';
			    			if(_element.professorResumeList.length>0){
			    				html += '<div class="meet-expert-intro">';
			    				$(_element.professorResumeList).each(function(_ind,_ele){
			    					html += '<p>'+_ele.recode+'</p>';
			    				});
			    				html += '</div>';
			    			}
			    			html += '</div>';
			    			dothtml += '<span></span>';
			    		});
			    		$('.swiper-wrapper').html(html);
			    		var _elewidth = parseInt($('.swiper-slide').css('width'));
			    		$('.swiper-wrapper').css('width',_elewidth*data.attach.length);
			    		$('.meet-expert-dot').html(dothtml);
			    		$('.meet-expert-dot span').first().addClass('active');
			    		$('.swiper-slide').on('swipeLeft',function(e){
			    			var $e = $(e.currentTarget); 
			    			var _slideIndex = parseInt($('.meet-expert-dot').attr('data-index'));
			    			_slideIndex = _slideIndex?_slideIndex:0;
			    			var _left = parseInt($e.parent().css('left'));
			    			if(parseInt($e.parent().css('width'))==-_left+_elewidth){
			    				return false;
			    			}
			    			_slideIndex++;
			    			$('.swiper-wrapper').animate({left:(_left-_elewidth)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq(_slideIndex).addClass('active');
			    			$('.meet-expert-dot').attr('data-index',_slideIndex);
			    		});
			    		$('.swiper-slide').on('swipeRight',function(e){
			    			var $e = $(e.currentTarget);
			    			var _slideIndex = parseInt($('.meet-expert-dot').attr('data-index'));
			    			var _left = parseInt($e.parent().css('left'));
			    			if(_left==0){
			    				return false;
			    			}
			    			_slideIndex--;
			    			$e.parent().animate({left:(_left+_elewidth)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq(_slideIndex).addClass('active');
			    			$('.meet-expert-dot').attr('data-index',_slideIndex);
			    		});
			    		$('.meet-expert-pre').click(function(e){
			            	var _slideIndex = parseInt($('.meet-expert-dot').attr('data-index'));
			    			var _left = parseInt($('.swiper-wrapper').css('left'));
			    			if(_left==0){
			    				return false;
			    			}
			    			_slideIndex--;
			    			$('.swiper-wrapper').animate({left:(_left+_elewidth)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq(_slideIndex).addClass('active');
			    			$('.meet-expert-dot').attr('data-index',_slideIndex);
			    		});
			    		$('.meet-expert-next').click(function(e){
			            	var _slideIndex = parseInt($('.meet-expert-dot').attr('data-index'));
			            	_slideIndex = _slideIndex?_slideIndex:0;
			            	var _left = parseInt($('.swiper-wrapper').css('left'));
			    			if(parseInt($('.swiper-wrapper').css('width'))==-_left+_elewidth){
			    				return false;
			    			}
			    			_slideIndex++;
			    			$('.swiper-wrapper').animate({left:(_left-_elewidth)+'px'});
			    			$('.meet-expert-dot span').removeClass('active').eq(_slideIndex).addClass('active');
			    			$('.meet-expert-dot').attr('data-index',_slideIndex);
			    		});
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	schedule_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		_t.getmeet_fn(_meetId);
		
		$.ajax({
		  	type: 'get',
		 	url: _t.config.url.schedule,
		  	data: {
				meetId:_meetId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '';
			    		$(data.attach).each(function(_index,_element){
			    			html+='<div class="meet-sche-session"><div class="meet-sche-tag"><p class="meet-sche-tagl"></p><p class="meet-sche-tagr">Session'+(_index+1)+'<br><i>'+_element.stage+'</i></p></div>';
			    			if(_element.scheduleList.length>0){
			    				$(_element.scheduleList).each(function(_i,_e){
									html+='<div class="meet-sche-item"><span class="meet-sche-time">'+_e.times;
					    			html+='<b></b></span><span class="meet-sche-title">'+_e.content;
					    			html+='</span></div>';
			    				});
			    			}
			    			html+='</div>';
			    		});
						$('.meet-sche-sessionwrap').html(html);
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	data_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		_t.getmeet_fn(_meetId);
		$.ajax({
		  	type: 'get',
		 	url: _t.config.url.data,
		  	data: {
				meetId:_meetId
			},
		  	dataType: 'json',
		  	success: function(data){
			    if(data.code=='1'){
			    	if(data.attach.length>0){
			    		var html = '';
			    		$(data.attach).each(function(_index,_element){
			    			html+='<li><div class="meet-data-pic"><img src="'+_element.pictureUrl;
			    			html+='"></div><div class="meet-data-right"><p class="meet-data-text">'+_element.name;
			    			html+='</p><p class="meet-data-sendbtn" data-id="'+_element.id;
			    			html+='">发送到邮箱</p></div></li>';

			    		});
						$('.meet-data-list').html(html);
						$('.meet-data-sendbtn').on('click',function(e){
							var $e = $(e.currentTarget);
							_fileId = $e.attr('data-id');
							var _alerthtml = '';
							_alerthtml += '<div class="meet-alert-title"><b>资料标题：</b>'+$e.siblings('.meet-data-text').text();
							_alerthtml += '</div><div class="meet-alert-input"><b>邮箱账号：</b><input type="text" class="meet-send-txt" /></div>';
							 $.dialog({
			                    content : _alerthtml,
			                    top:'发送提醒',
			                    title : 'alert',
			                    cancel : function() {

			                    },
			                    ok : function() {
			                    	var _sendemail = $.trim($('.meet-send-txt').val());
			                    	if(!_sendemail){
			                    		return false;
			                    	}else{
			                    		$.ajax({
				                        	type: 'get',
										 	url: _t.config.url.senddata,
										  	data: {
												id:_fileId,
												emailAddress:_sendemail
											},
										  	dataType: 'json',
										  	success:function(data){
										  		$('.rDialog').remove();
										  		$('.rDialog-mask').remove();
										  		if(data.code==1){
										  			$.dialog({
										  				top:'发送提醒',
									                    content : '<center>该会议资料已发送到你'+_sendemail+'</center>',
														title:'',
									                    time : 2000
								           			 });
										  		}else{
										  			$.dialog({
										  				top:'发送提醒',
									                    content : '<center>发送失败！</center>',
														title:'alert',
									                    time : 2000
								           			 });
										  		}
										  	},
										  	error:function(){
										  		$.dialog({
										  			top:'发送提醒',
								                    content : '<center>发送失败！</center>',
													title:'alert',
								                    time : 2000
							           			 });
										  	}

				                        });
			                    	}
			                    },
			                    lock:true
			                });
						});
			    	}
			    }else{
			    	$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
           			 });
			    }
		  	},
		  	error: function(){
		    	$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			 });
		  	}
		});
	},
	ask_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		var _userId = _t.getHrefParam('userId');
		_t.getmeet_fn(_meetId);
		$.ajax({
			type: 'get',
		 	url: _t.config.url.getallask,
		  	data: {
				meetId:_meetId,
				perId:_userId
			},
		  	dataType: 'json',
		  	success:function(data){
		  		if(data.code==1){
		  			if(data.attach.length>0){
		  				var _askhtml = '';
		  				$(data.attach).each(function(_index,_element){
				  			_askhtml += '<li class="clearfix"><div class="meet-ask-pic"><img src="../images/expert-photo2.jpg"></div><div class="meet-ask-right"><p class="meet-ask-name">'+_element.perName;
				  			_askhtml += '<i>'+_element.times;
				  			_askhtml += '</i></p><p class="meet-ask-text">'+_element.content+'</p></div></li>';
		  				});
		  				$('.meet-ask-list').html(_askhtml);
		  			}
		  		}else{
		  			$.dialog({
	                    content : '获取我的提问列表失败！',
						title:'alert',
	                    time : 2000
	       			});
		  		}
		  	}
		});
		$('.meet-ask-btn').click(function(){
			var _value = encodeURIComponent($.trim($('.meet-ask-txt').val()));
			if(!_value){
				$.dialog({
                    content : '请输入提问内容！',
					title:'alert',
                    time : 2000
       			});
				return false;
			}else{
				var _date = new Date();
				var _times = _date.getFullYear()+'.'+_t.toTwo(_date.getMonth()+1)+'.'+_t.toTwo(_date.getDate())+' '+_t.toTwo(_date.getHours())+':'+_t.toTwo(_date.getMinutes())+':'+_t.toTwo(_date.getSeconds());
				$.ajax({
					type: 'get',
				 	url: _t.config.url.ask,
				  	data: {
				  		code:_meetId,
				  		perId:_userId,
						content:_value,
						times:_times
					},
				  	dataType: 'json',
				  	success:function(data){
				  		if(data.code==1){
				  			var _askhtml = '<li class="clearfix"><div class="meet-ask-pic"><img src="../images/meet-user-default.jpg"></div><div class="meet-ask-right"><p class="meet-ask-name">汪洋<i>10：20</i></p><p class="meet-ask-text">'+_value+'</p></div></li>';
				  			$('.meet-ask-list').append(_askhtml);
				  		}else{
				  			$.dialog({
			                    content : '提问失败！',
								title:'alert',
			                    time : 2000
			       			});
				  		}
				  	}
				});
			}
		});

	},
	vote_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		var _userId = _t.getHrefParam('userId');
		_t.getmeet_fn(_meetId);
		var _voteHtml = '';
		var _id ='';
		for(var i=1;i<11;i++){
			_voteHtml += '<li class="clearfix"><div class="meet-vote-num"><span>'+i;
			_voteHtml += '</span></div><div class="meet-vote-right"><div class="meet-vote-optionlist">';
			for(var j=1;j<7;j++){
				switch(j){
					case 1: _id = 'A';break;
					case 2: _id = 'B';break;
					case 3: _id = 'C';break;
					case 4: _id = 'D';break;
					case 5: _id = 'E';break;
					case 6: _id = 'F';break;
				}
				_voteHtml +='<div class="meet-vote-option"><label for="">'+_id;
				_voteHtml += '.</label><input type="checkbox" value="'+_id+'"></div>';
			}	
			_voteHtml += '<div class="meet-vote-option meet-vote-btn"><input type="button" value="提交答案" data-id="'+i+'"></div></div></div></li>';	
			$('.meet-vote-list').html(_voteHtml);	
		}
		$('.meet-vote-btn input').click(function(e){
			var $e = $(e.currentTarget);
			var _titleId = $e.attr('data-id');
			$.ajax({
				type: 'get',
			 	url: _t.config.url.canvote,
			  	data: {
					meetId:_meetId,
					id:_titleId
				},
			  	dataType: 'json',
			  	success:function(data){
			  		if(data.code==1){
			  			if(data.attach==1){
			  				$.ajax({
			  					type:'get',
			  					url:_t.config.url.isvote,
			  					data:{
			  						meetId:_meetId,
			  						perId:_userId,
			  						id:_titleId
			  					},
			  					dataType:'json',
			  					success:function(data){
			  						if(data.code == 1){
			  							var _answer = '';
			  							var _input = $e.parent().siblings().children('input');
			  							$(_input).each(function(_index,_element){
			  								if($(_element).is(':checked')){
			  									_answer = _answer.concat($(_element).attr('value'));
			  								}
			  							});

			  							$.ajax({
						  					type:'get',
						  					url:_t.config.url.vote,
						  					data:{
						  						content:{
						  							code:_meetId,
							  						perId:_userId,
							  						questionCode:_titleId,
							  						auswer:_answer
						  						}
						  					},
						  					dataType:'json',
						  					success:function(data){
						  						if(data.code == 1){
						  							$.dialog({
									                    content : '投票成功！',
														title:'alert',
									                    time : 2000
									       			});
						  						}else{
							  						$.dialog({
									                    content : '投票失败！',
														title:'alert',
									                    time : 2000
									       			});
							  					}
						  					}
						  				});	
			  						}else{
			  							$.dialog({
						                    content : '您已经投票了！',
											title:'alert',
						                    time : 2000
						       			});
			  						}
			  					}
			  				});
			  			}else{
			  				$.dialog({
			                    content : '用户不可以投票！',
								title:'alert',
			                    time : 2000
			       			});
			  			}
			  		}else{
			  			$.dialog({
		                    content : '操作失败！',
							title:'alert',
		                    time : 2000
		       			});
			  		}
			  	}
			});
		});
	},
	feedback_fn:function(){
		var _t = this;
		var _meetId = _t.getHrefParam('meetId');
		var _userId = _t.getHrefParam('userId');
		_t.getmeet_fn(_meetId);
		$.ajax({
			type:'get',
			url:_t.config.url.getfeedback,
			data:{meetId:_meetId},
			dataType:'json',
			success:function(data){
				if(data.code == 1){
					$('.meet-header-back h3').text(data.attach.title);
					$('.meet-feed-tips').text(data.attach.discribe);
					$('.meet-feed-list').attr('data-id',data.attach.oid);
					var _feedhtml = '';
					if(data.attach.questionList.length>0){
						$(data.attach.questionList).each(function(_index,_element){
							_feedhtml += '<li><div class="meet-feed-title"><span>'+_element.seq;
							_feedhtml += '.</span>'+_element.content;
							_feedhtml += '</div><div class="meet-feed-option" data-type="'+_element.qtype;
							_feedhtml += '" data-id="'+_element.seq+'">';
							if(_element.selecterList.length>0){
								if(_element.qtype == 0){
									$(_element.selecterList).each(function(_ind,_ele){
										_feedhtml += '<div class="meet-feed-item"><input type="radio" name="'+_ele.qseq;
										_feedhtml += '" value="'+_ele.selseq;
										_feedhtml += '" /><label>'+_ele.content+'</label></div>';
									});
								}else if(_element.qtype == 1){
									$(_element.selecterList).each(function(_ind,_ele){
										_feedhtml += '<div class="meet-feed-item"><input type="checkbox" name="' +_ele.qseq;
										_feedhtml += '" value="'+_ele.selseq;
										_feedhtml += '" /><label>'+_ele.content+'</label></div>';
									});
								}else if(_element.qtype == 2){
									_feedhtml += '<div class="meet-feed-item"><select name="' +_element.seq +'">';
									$(_element.selecterList).each(function(_ind,_ele){
										_feedhtml += '<option value="'+_ele.selseq+'">'+_ele.content+'</option>';
									});
									_feedhtml += '</select></div>';
								}else if(_element.qtype == 3){
									$(_element.selecterList).each(function(_ind,_ele){
										_feedhtml += '<div class="meet-feed-item"><textarea placeholder="'+_ele.content;
										_feedhtml += '" name="'+_ele.qseq;
										_feedhtml += '" data-id="'+_ele.selseq+'"></textarea></div>';
									});
								}
							}
							_feedhtml += '</div></li>';
							$('.meet-feed-list').html(_feedhtml);
						});
					}
				}else{
					$.dialog({
	                    content : '加载页面失败！',
						title:'alert',
	                    time : 2000
	       			});
				}
			},
			error:function(){
				$.dialog({
                    content : '加载页面失败！',
					title:'alert',
                    time : 2000
       			});
			}
		});

		$('.meet-feed-form input').click(function(){
			var _oid = $('.meet-feed-list').attr('data-id');
			$.ajax({
				type:'get',
				url:_t.config.url.isfeedback,
				data:{
					replayId: _userId,
					oid: _oid
				},
				success:function(data){
					if(data.code==1 && data.attach == 0){
						var _tag = true;
						var _content = [];
						$('.meet-feed-option').each(function(_index,_element){
							var _qSeq = $(_element).attr('data-id');
							var _qType = $(_element).attr('data-type');
							var _seSeq='',_seValue='';
							if(_qType == '0'){
								$(_element).children('.meet-feed-item').children('input').each(function(_ind,_ele){
									if($(_ele).is(':checked')){
										_seSeq = $(_ele).attr('value');
										// _seValue = $(_ele).siblings('label').text();
									}
								});
								if(!_seSeq){
									$.dialog({
					                    content : '第题'+_qSeq+'没有作答！',
										title:'alert',
					                    time : 2000
					       			});
					       			_tag = false;
					       			return false;
								}else{
									_content.push({
										replayId:_userId,
										oid:_oid,
										qSeq:_qSeq,
										seSeq:_seSeq,
										seValue:_seSeq
									});
								}
								
							}else if(_qType == '1'){
								var _checknum = 0;
								$(_element).children('.meet-feed-item').children('input').each(function(_ind,_ele){
									if($(_ele).is(':checked')){
										_checknum++;
										_seSeq = $(_ele).attr('value');
										// _seValue = $(_ele).siblings('label').text();
										_content.push({
											replayId:_userId,
											oid:_oid,
											qSeq:_qSeq,
											seSeq:_seSeq,
											seValue:_seSeq
										});
									}
								});
								if(_checknum == 0){
									$.dialog({
					                    content : '第题'+_qSeq+'没有作答！',
										title:'alert',
					                    time : 2000
					       			});
					       			_tag = false;
					       			return false;
								}
							}else if(_qType == '2'){
								_seSeq = $(_element).children('.meet-feed-item').children('select').val();
								_content.push({
									replayId:_userId,
									oid:_oid,
									qSeq:_qSeq,
									seSeq:_seSeq,
									seValue:_seSeq
								});
							}else if(_qType == '3'){
								var _textarea = $(_element).children('.meet-feed-item').children('textarea');
								_seSeq = $(_textarea).attr('data-id');
								_seValue = $(_textarea).text();
								_content.push({
									replayId:_userId,
									oid:_oid,
									qSeq:_qSeq,
									seSeq:_seSeq,
									seValue:_seValue
								});
							}
						});
						if(_tag){

							$.ajax({
								type:'post',
								url:_t.config.url.feedback,
								data:{
									content:_content
								},
								success:function(data){
									if(data.code == 1){
										$.dialog({
						                    content : '提交成功！',
											title:'alert',
						                    time : 2000
						       			});
									}else{
										$.dialog({
						                    content : '提交失败！',
											title:'alert',
						                    time : 2000
						       			});
									}
								},
								error:function(){
									$.dialog({
					                    content : '提交失败！',
										title:'alert',
					                    time : 2000
					       			});
								}
							});
						}
					}else{
						$.dialog({
		                    content : '您已经提交过了！',
							title:'alert',
		                    time : 2000
		       			});
					}
				},
				error:function(){
					$.dialog({
	                    content : '操作失败！',
						title:'alert',
	                    time : 2000
	       			});
				}
			})










			
		});
	},
	getHrefParam:function(_name){
		var _value = '';
		if(window.location.href.split('?')[1]){
			var _paramArr = window.location.href.split('?')[1].split('&');
			$(_paramArr).each(function(_index,_element){
				var _param = _element.split('=');
				if(_param[0]==_name){
					_value = _param[1];
				}
			});
		}
		
		return _value;
	},
	toTwo:function(n){
		if(n<9){
			return '0'+n;
		}else{
			return n.toString();
		}
	}
}

meet.init();
