/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/22
 * Time: 15:30
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * echarts主题配置
     */
    var _theme = {
        'color': [
            '#00aaff',
            '#ff587b',
            '#29d582',
            '#ffc62f',
            '#24ccf6',
            '#f7233c',
            '#7d68ff',
            '#ff7700'
        ],
        'backgroundColor': 'rgba(0,0,0,0)',
        'textStyle': {},
        'title': {
            'textStyle': {
                'color': '#333333'
            },
            'subtextStyle': {
                'color': '#aaaaaa'
            }
        },
        'line': {
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': 2
                }
            },
            'symbolSize': '5',
            'symbol': 'emptyCircle',
            'smooth': false
        },
        'radar': {
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': 2
                }
            },
            'symbolSize': '5',
            'symbol': 'emptyCircle',
            'smooth': false
        },
        'bar': {
            'itemStyle': {
                'normal': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                },
                'emphasis': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                }
            }
        },
        'pie': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'scatter': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'boxplot': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'parallel': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'sankey': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'funnel': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'gauge': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'candlestick': {
            'itemStyle': {
                'normal': {
                    'color': '#c12e34',
                    'color0': '#2b821d',
                    'borderColor': '#c12e34',
                    'borderColor0': '#2b821d',
                    'borderWidth': 1
                }
            }
        },
        'graph': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': '1',
                    'color': '#aaaaaa'
                }
            },
            'symbolSize': '25'
        },
        'map': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#dddddd',
                    'borderColor': '#eeeeee',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(230,182,0,1)',
                    'borderColor': '#dddddd',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#c12e34'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(193,46,52)'
                    }
                }
            }
        },
        'geo': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#dddddd',
                    'borderColor': '#eeeeee',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(230,182,0,1)',
                    'borderColor': '#dddddd',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#c12e34'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(193,46,52)'
                    }
                }
            }
        },
        'categoryAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'valueAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'logAxis': {
            'axisLine': {
                'show': false,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'timeAxis': {
            'axisLine': {
                'show': false,
                'lineStyle': {
                    'color': '#f8f8f8'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#486074'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#f8f8f8'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.3)',
                        'rgba(200,200,200,0.3)'
                    ]
                }
            }
        },
        'toolbox': {
            'iconStyle': {
                'normal': {
                    'borderColor': '#06467c'
                },
                'emphasis': {
                    'borderColor': '#4187c2'
                }
            }
        },
        'legend': {
            'textStyle': {
                'color': '#486074'
            }
        },
        'tooltip': {
            'axisPointer': {
                'lineStyle': {
                    'color': '#f8f8f8',
                    'width': 1
                },
                'crossStyle': {
                    'color': '#f8f8f8',
                    'width': 1
                }
            }
        },
        'timeline': {
            'lineStyle': {
                'color': '#005eaa',
                'width': 1
            },
            'itemStyle': {
                'normal': {
                    'color': '#005eaa',
                    'borderWidth': 1
                },
                'emphasis': {
                    'color': '#005eaa'
                }
            },
            'controlStyle': {
                'normal': {
                    'color': '#005eaa',
                    'borderColor': '#005eaa',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'color': '#005eaa',
                    'borderColor': '#005eaa',
                    'borderWidth': 0.5
                }
            },
            'checkpointStyle': {
                'color': '#005eaa',
                'borderColor': 'rgba(49,107,194,0.5)'
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#005eaa'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#005eaa'
                    }
                }
            }
        },
        'visualMap': {
            'color': [
                '#12a1e8',
                '#96d2f0'
            ]
        },
        'dataZoom': {
            'backgroundColor': 'rgba(47,69,84,0)',
            'dataBackgroundColor': 'rgba(47,69,84,0.3)',
            'fillerColor': 'rgba(167,183,204,0.4)',
            'handleColor': '#a7b7cc',
            'handleSize': '100%',
            'textStyle': {
                'color': '#333333'
            }
        },
        'markPoint': {
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#486074'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#486074'
                    }
                }
            }
        }
    };
    angular.module('app.core').constant('THEME', _theme);
})();