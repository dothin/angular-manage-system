/**
 * Created by xd-66 on 2016/11/24.
 */
(function () {
    'use strict';
    /**
     * 个人画像---消费水平---echarts配置
     */
    angular.module('app.echarts').factory('pieServer', ['pie',
        function (pie) {
            var _option = {
                pie1: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    pieOption.xAxis = [
                        {
                            type: 'category',
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            axisLabel: {interval: 0},
                            data: ['正常在校学生相似度', '同班学生相似度', '同级学生相似度', '失联学生相似度']
                        }
                    ];
                    pieOption.yAxis = [
                        {
                            show: false
                        }
                    ];
                    pieOption.grid = {
                        bottom: 30
                    };
                    pieOption.series = [
                        {
                            name: '正常在校学生',
                            center: [
                                '20.0%',
                                '40%'
                            ],
                            radius: [
                                '40%',
                                '50%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '同班学生',
                            center: [
                                '40.0%',
                                '40%'
                            ],
                            radius: [
                                '40%',
                                '50%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '同级学生',
                            center: [
                                '60.0%',
                                '40%'
                            ],
                            radius: [
                                '40%',
                                '50%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }, {
                            name: '失联学生',
                            center: [
                                '80.0%',
                                '40%'
                            ],
                            radius: [
                                '40%',
                                '50%'
                            ],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 0,
                                name: '相似度',
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }
                                    }
                                }
                            }, {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#eaecef'
                                    },
                                    emphasis: {
                                        color: '#eaecef'
                                    }
                                },
                                hoverAnimation: false
                            }]
                        }];
                    //需要修改配置在此处进行
                    return pieOption;
                },
                pie2: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    pieOption.series = [
                        {
                            name: '单维度占比',
                            type: 'pie',
                            radius: ['60%', '70%'],
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: '占有率',
                                    label: {
                                        normal: {
                                            formatter: '{d} %',
                                            textStyle: {
                                                fontSize: 20
                                            }
                                        }
                                    }
                                },
                                {
                                    value: 0,
                                    name: '占位',
                                    label: {
                                        normal: {
                                            formatter: '\n完成率',
                                            textStyle: {
                                                color: '#999'
                                            }
                                        }
                                    },
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#eaecef'
                                        }, emphasis: {
                                            color: '#eaecef'
                                        }
                                    },
                                    hoverAnimation: false
                                }
                            ]
                        }];
                    //需要修改配置在此处进行
                    return pieOption;
                },
                pie3: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    var data = [{
                        value: 11,
                        name: '食堂'
                    }, {
                        value: 22,
                        name: '超市'
                    }, {
                        value: 33,
                        name: '刷卡'
                    }, {
                        value: 22,
                        name: '交通'
                    }];
                    pieOption.title = {
                        text: '统计',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    };
                    pieOption.legend = {
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: ['食堂', '超市', '刷卡', '交通'],
                        itemWidth:20,
                        itemHeight:10
                    };
                    pieOption.series = [{
                        name:'消费',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['25%', '60%'],
                        label: {
                            normal: {
                                position: 'inner',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }, {
                        name:'消费',
                        type: 'pie',
                        radius: ['60%', '90%'],
                        itemStyle: {
                            normal: {
                                color: '#f2f2f2'
                            },
                            emphasis: {
                                color: '#adadad'
                            }
                        },
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{c}%',
                                textStyle: {
                                    color: '#777777',
                                    fontSize: 12
                                }
                            }
                        },
                        data: data
                    }];
                    //需要修改配置在此处进行
                    return pieOption;
                },
                pie4: function () {
                    //获取基础配置项
                    var pieOption = pie.getOption('%');
                    var data = [{
                        value: 11,
                        name: '食堂'
                    }, {
                        value: 22,
                        name: '超市'
                    }, {
                        value: 33,
                        name: '刷卡'
                    }, {
                        value: 22,
                        name: '交通'
                    }];
                    pieOption.title = {
                        text: '统计',
                        subtext: '2016年',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    };
                    pieOption.legend = {
                        orient: 'vertical',
                        right: '0%',
                        bottom: '0%',
                        data: ['食堂', '超市', '刷卡', '交通'],
                        itemWidth:20,
                        itemHeight:10
                    };
                    pieOption.series = [{
                        name:'消费',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['50%', '90%'],
                        label: {
                            normal: {
                                position: 'inner',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }];
                    //需要修改配置在此处进行
                    return pieOption;
                }
            };
            return {
                pie1: _option.pie1(),
                pie2: _option.pie2(),
                pie3: _option.pie3(),
                pie4: _option.pie4()
            };
        }
    ]);
})();