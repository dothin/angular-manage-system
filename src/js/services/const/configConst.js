/**
 * Created with IntelliJ IDEA.
 * User: gaoHuaBin
 * Date: 2016/11/21
 * Time: 9:40
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    /**
     * 模块化配置
     */
    var _config = {
        home: {
            show: true
        },
        groupHX: {
            show: true, //群体画像功能关闭后，受影响的其他模块有：关注群体里面查看群体画像，个人画像里面查看圈子画像，首页入口
            base: {
                show: true,
                option: {
                    sex: {
                        show: true,
                        class: 'col-3-1'
                    },
                    age: {
                        show: true,
                        class: 'col-3-1'
                    },
                    major: {
                        show: true,
                        class: 'col-3-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-3-1'
                    },
                    political: {
                        show: true,
                        class: 'col-3-1'
                    },
                    nation: {
                        show: true,
                        class: 'col-3-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    abnormal: {
                        show: true,
                        class: 'col-3-1'
                    },
                    dormInOut: {
                        show: true,
                        class: 'col-3-1'
                    },
                    lifeRegular: {
                        show: true,
                        class: 'col-3-1'
                    },
                    stopDorm: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    lowConsume: {
                        show: true,
                        class: 'col-3-1'
                    },
                    eatConsume: {
                        show: false,
                        class: 'col-3-1'
                    },
                    consumeType: {
                        show: true,
                        class: 'col-3-2'
                    },
                    cardMonth: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friendship: {
                        show: true,
                        class: 'col-1-1'
                    },
                    active: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situationNum: {
                        show: true,
                        class: 'col-1-1'
                    },
                    bookType: {
                        show: true,
                        class: 'col-2-1'
                    },
                    bookRank: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    fail: {
                        show: true,
                        class: 'col-4-1'
                    },
                    rankChange: {
                        show: true,
                        class: 'col-4-1'
                    },
                    courseAvg: {
                        show: true,
                        class: 'col-2-1'
                    },
                    courseScore: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    practice: {
                        show: false,
                        class: 'col-1-1 col-h100s'
                    }
                }
            }
        },
        groupCompare: {
            show: true,
            compareCondition: {
                normalCompare: {
                    show: true
                },
                twoCompare: {
                    show: true
                },
                focusCompare: {
                    show: true
                }
            },
            base: {
                show: true,
                option: {
                    base: {
                        show: true,
                        class: 'col-1-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    outIn: {
                        show: true,
                        class: 'col-2-1'
                    },
                    law: {
                        show: true,
                        class: 'col-2-1'
                    },
                    stay: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    month: {
                        show: true,
                        class: 'col-3-1'
                    },
                    diningRoom: {
                        show: true,
                        class: 'col-3-1'
                    },
                    breakfast: {
                        show: true,
                        class: 'col-3-1'
                    },
                    card: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friend: {
                        show: true,
                        class: 'col-1-1'
                    },
                    activity: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situation: {
                        show: true,
                        class: 'col-2-1'
                    },
                    proportion: {
                        show: true,
                        class: 'col-2-1'
                    },
                    average: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    fail: {
                        show: true,
                        class: 'col-1-1'
                    },
                    score: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    base: {
                        show: false,
                        class: 'col-1-1'
                    },
                    origin: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            }
        },
        focusGroup: {
            show: true, //关注功能关闭后，受影响的其他模块有：添加关注，群体对比里面两两对比和关注群体对比隐藏，个人画像搜索界面去关注列表的入口，首页入口
            groupManage: {
                show: true
            },
            groupList: {
                show: true
            }
        },
        studentHX: {
            show: true, //个人画像功能关闭后，受影响的其他模块有：各个名单个人画像入口，首页入口
            base: {
                show: true,
                option: {
                    base: {
                        show: true,
                        class: 'col-2-1'
                    },
                    contact1: {
                        show: true,
                        class: 'col-2-1'
                    },
                    grade: {
                        show: true,
                        class: 'col-2-1'
                    },
                    contact2: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            life: {
                show: true,
                option: {
                    abnormal: {
                        show: true,
                        class: 'col-3-1'
                    },
                    track: {
                        show: true,
                        class: 'col-3-1'
                    },
                    rule: {
                        show: true,
                        class: 'col-3-1'
                    },
                    time: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            consumption: {
                show: true,
                option: {
                    lowConsumption: {
                        show: true,
                        class: 'col-3-1'
                    },
                    meals: {
                        show: false,
                        class: 'col-3-1'
                    },
                    type: {
                        show: true,
                        class: 'col-3-2'
                    },
                    card: {
                        show: true,
                        class: 'col-1-1'
                    },
                    economic: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            social: {
                show: true,
                option: {
                    friendship: {
                        show: true,
                        class: 'col-2-1 col-h100s'
                    },
                    social: {
                        show: true,
                        class: 'col-2-1 col-h100s'
                    }
                }
            },
            library: {
                show: true,
                option: {
                    situation: {
                        show: true,
                        class: 'col-1-1'
                    },
                    category: {
                        show: true,
                        class: 'col-2-1'
                    },
                    last: {
                        show: true,
                        class: 'col-2-1'
                    }
                }
            },
            study: {
                show: true,
                option: {
                    average: {
                        show: true,
                        class: 'col-4-3'
                    },
                    list: {
                        show: true,
                        class: 'col-4-1'
                    },
                    score: {
                        show: true,
                        class: 'col-1-1'
                    }
                }
            },
            practice: {
                show: false,
                option: {
                    practice: {
                        show: false,
                        class: 'col-1-1 col-h100s'
                    }
                }
            }
        },
        warning: {
            show: true,
            lostDetail: {
                show: true
            },
            poorDetail: {
                show: true
            },
            studyDetail: {
                show: true
            }
        },
        analysis: {
            show: true
        },
        dataExport: {
            show: true
        },
        userSafe: {
            show: true
        },
        userSet: {
            show: false
        }
    };
    myApp.constant('CONFIG', _config);
})();