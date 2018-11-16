
import ccclass = cc._decorator.ccclass;

let self;
@ccclass
export class ClickEventCustom extends cc.Component {

    private holdTimeEclipse = 0;  //用来记录点击开始和结束的时差
    private holdClick = false;  //用来记录是否点击记录update方法是否执行holdTimeEclipse的值
    private holdOneClick = 0;  //用来记录点击次数

    //回调函数需要添加脚本时给定
    private doubleClickCallback =null; //双击回调函数
    private oneClickCallback = null; //单击回调函数
    private longClickCallback = null; //长按回调函数

    onLoad () {
        self = this;
        //点击事件开始
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.holdClick = true; //update方法会执行代码
            self.holdTimeEclipse = 0; //update方法会增加这个值
        },this);

        //点击事件结束
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            self.holdClick = false; //禁止update执行
            if(self.holdTimeEclipse>=30) { //判断当前的值是否大于等于指定的值
                self.btnStatus('long'); //如果大于这个值是长按操作
            } else {
                self.btnStatus('short'); //否则是点击操作
            }
            self.holdTimeEclipse=0;//回归起点从新记录
        },this);
    }

    //按钮状态监测
    btnStatus(status){
        if(status == 'short') { //如果是点击
            this.holdOneClick ++; //点击次数加一
            //延迟监测-->当发生第二次点击时这个值会累计
            setTimeout(() => {
                if(self.holdOneClick == 1) { //单机操作
                    //归零计数
                    self.holdOneClick = 0;
                    if(self.oneClickCallback!= null){ //不为空则执行回调函数
                        self.oneClickCallback(self); //传入this便于后续操作
                    }
                } else if(self.holdOneClick == 2) { //双击操作
                    //归零计数
                    this.holdOneClick = 0;
                    if(self.doubleClickCallback != null){ //不为空则执行回调函数
                        self.doubleClickCallback(self); //传入this便于后续操作
                    }
                }
            }, 400);
        } else { //长按操作
            this.holdOneClick = 0;
            if(self.longClickCallback != null){ //不为空则执行回调函数
                self.longClickCallback(self); //传入this便于后续操作
            }
        }
    }

    /**
     * 该方法便于计数
     * @param dt
     */
    update (dt) {
        if(self.holdClick) {
            self.holdTimeEclipse++;
            if(self.holdTimeEclipse>120) { //如果长按时间大于2s，则认为长按了2s
                self.holdTimeEclipse=120;
            }
        }
    }
}
