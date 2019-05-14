define(function(require, exports, module) {
    var $ = require('jquery');
    var util = require('util');

    // 发布需求弹窗
    var $publishLayer = $('#publishLayer');
    var timer = null;

    $('.designer-small-btn').click(function() {
        $publishLayer.removeClass('hide');
    })
    $('.close').click(function() {
        resetPublish()
    })

    // 重置发布需求弹窗
    function resetPublish() {
        $publishLayer.addClass('hide');
        $('#phone, #coder').removeClass('err').val('');
        $('#phoneErrItem, #coderErrItem').addClass('hide');
        clearInterval(timer);
        $('#getCoder').removeClass('bounce_second').text('获取验证码');
    }

    var phoneReg = /^(13\d|14[579]|15\d|16[6]|17[0135678]|18\d|19[89])\d{8}$/;
    var coderReg = /^\d{6}$/;

    // 验证简单需求字段参数
    function verifySimpleParams(param, ruleArr, needActive) {
        var flag = true
        var defaultRuleArr = [
            ['phone', '联系电话', phoneReg, '#phone'],
            ['verify_code', '短信验证码', coderReg, '#coder']
        ];
        ruleArr = ruleArr || defaultRuleArr;
        var len = ruleArr.length
        var inputErrClass = '.err'
        var formItemClass = '.form-item'
        var inputErrTips = '.input-err'

        for (var i = 0; i < len; i++) {

            var key = ruleArr[i][0],
                tips = ruleArr[i][1],
                regExp = ruleArr[i][2],
                selector = ruleArr[i][3],
                val = param[key];

            var $ele = $(selector);
            // 错误信息区域
            var $errItem = $(selector + 'ErrItem');
            var $errTips = $(selector + 'ErrMsg');
            if (!val) {
                $errTips.html('请输入' + tips);
                $ele.addClass('err');
                $errItem.removeClass('hide');
                flag = false;
            } else if (regExp && !regExp.test(val)) {
                $errTips.html(tips + '格式不正确');
                $ele.addClass('err');
                $errItem.removeClass('hide');
                flag = false;
            } else {
                $errTips.empty()
                $ele.removeClass('err')
                $errItem.addClass('hide');
            }
        }

        // 发布按钮添加‘active’
        if (needActive) {
            var methodName = '';
            if (!$('#phone').hasClass('err') && !$('#coder').hasClass('err')) {
                methodName = 'addClass';
            } else {
                methodName = 'removeClass';
            }
            $('#submitBtn')[methodName]('active');
        }
        return flag
    }

    // 添加blur事件
    function addBlurEventHandler() {
        $publishLayer.on('blur', 'input', function() {
            var $this = $(this);
            var param = {},
                key = '',
                ruleArr = [];
            if ($this.is('#phone')) {
                key = 'phone';
                ruleArr.push(['phone', '联系电话', phoneReg, '#phone']);
            } else if ($this.is('#coder')) {
                key = 'verify_code';
                ruleArr.push(['verify_code', '短信验证码', coderReg, '#coder']);
            }

            if (key) {
                param[key] = $this.val();
                verifySimpleParams(param, ruleArr, true);
            }
        });
    }

    // 发布需求
    function publishDemand() {
        var param = {
            phone: $('#phone').val(),
            verify_code: $('#coder').val()
        }
        if (verifySimpleParams(param)) {
            util.AJAX('/apply/simpleSubmit', 'post', param, function(res) {
                if (res.code === 0) {
                    util.layer('发布成功', function() {
                        resetPublish()
                    })
                    try {
                        divolte.signal('publishDemand', { id: res.data.id })
                    } catch (e) {
                        throw new Error(e)
                    }
                } else {
                    util.layer(res.msg)
                }
            })
        }
    };

    // 绑定获取手机验证码事件
    function bindGetCoderHandler() {
        $('#getCoder').on('click', function() {
            var $this = $(this)
            if ($this.hasClass('bounce_second')) {
                return;
            }
            // 对应的手机号是否ok
            var ruleArr = [
                ['phone', '联系电话', phoneReg, '#phone']
            ];
            if (verifySimpleParams({ phone: $('#phone').val() }, ruleArr)) {
                // // 添加易盾验证
                $('#layerEdun').removeClass('hide')
            }
        })
    }

    // 易盾验证
    function useEDun() {
        var ins = null;
        initNECaptcha({
            "element": "#captcha",
            "captchaId": "37c85b29b2754beaaf785cac099a10f7",
            "width": 320,
            "mode": 'embed',
            onReady: function(instance) {
                ins = instance
            },
            onVerify: function(err, data) {
                if (err) {
                    return;
                }
                sendCode(data.validate, ins)
            }
        }, function onload(instance) {}, function onerror(err) {});

        $('#layerEdun').on('click', function() {
            $(this).addClass('hide')
        })
        $('#captcha').on('click', function(event) {
            event.stopPropagation();
        })
    }

    // 绑定倒计时
    function bindCountDownHandler($coder) {
        var $coder = $('#getCoder')
        var counter = 60
        $coder.addClass('bounce_second')
        timer = setInterval(function() {
            $coder.text(counter + 's')
            if (counter === 0) {
                $coder.text('获取验证码').removeClass('bounce_second')
                clearInterval(timer)
            }
            counter--
        }, 1000)
    }

    // 获取手机验证码
    function sendCode(validate, ins) {
        util.AJAX('/common/verify-code', 'post', { phone: $('#phone').val(), NECaptchaValidate: validate }, function(res) {
            if (res.code === 0) {
                bindCountDownHandler()
                util.layer('验证码已发送')
            } else {
                util.layer(res.msg)
            }
            $('#layerEdun').addClass('hide')
            ins.refresh();
        })
    }

    $('#publishLayer').on('click', '#submitBtn', function() {
        if (!$(this).hasClass('active')) {
            return;
        }
        publishDemand();
    });

    // 初始化事件
    ;
    (function() {
        addBlurEventHandler()
        bindGetCoderHandler()
        useEDun()
    })();
})