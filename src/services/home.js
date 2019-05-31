import * as axios from '../utils/axios';
//注册
export async function Register(params) {
    return axios.create(axios.APIHost+"/api/register/register",params)
}
//登录
export async function Login(params) {
    return axios.create(axios.APIHost+"/api/login/login",params)
}
//提交个人资料
export async function Personalinfo(params) {
    return axios.creat_Token(axios.APIHost+"/api/info/add_info",params)
}
//上传图片
export async function Uploadimg(params) {
    return axios.uploadImg_Token(axios.APIHost+"/api/uploads/pic",params)
}
//提交企业资料
export async function AgentCompony(params) {
    return axios.creat_Token(axios.APIHost+"/api/info/add_enterpriseone_info",params)
}
//提交机构信息
export async function AgentOutfit(params) {
    return axios.creat_Token(axios.APIHost+"/api/info/add_enterprisetwo_info",params)
}
//获取资讯列表
export async function Getnews() {
    return axios.read_Token(axios.APIHost+"/api/index/consult")
}
//获取资讯详情
export async function Getnewsinfo(params) {
    return axios.read_Token(axios.APIHost+"/api/index/consult_info?id="+params)
}
//获取个人信息
export async function Getuserinfo() {
    return axios.read_Token(axios.APIHost+"/api/index/my_info")
}
//获取个人资料
export async function Getuser() {
    return axios.read_Token(axios.APIHost+"/api/index/mine")
}
//修改昵称
export async function Editnickname(params) {
    return axios.creat_Token(axios.APIHost+"/api/index/edit_nickName",params)
}
//上传图片
export async function Uploadhead(params) {
    return axios.uploadImg_Token(axios.APIHost+"/api/index/edit_avatarUrl",params)
}
//推荐好友
export async function GetRecomn() {
    return axios.read_Token(axios.APIHost+"/api/index/recommend")
}
//意见反馈
export async function Opinion(params) {
    return axios.creat_Token(axios.APIHost+"/api/index/feedback",params)
}
//帮助中心
export async function GetHelp() {
    return axios.read_Token(axios.APIHost+"/api/index/hot_problem")
}
//问题详情
export async function GetHelpinfo(params) {
    return axios.read_Token(axios.APIHost+"/api/index/help_info?id="+params)
}
//特殊问题
export async function GetHelptype(params) {
    return axios.read_Token(axios.APIHost+"/api/index/help?type="+params)
}
//贷款上传
export async function Getshopinfo(params) {
    return axios.creat_Token(axios.APIHost+"/api/goods/add_loan",params)
}
//理财上传
export async function Agentshopinfo(params) {
    return axios.creat_Token(axios.APIHost+"/api/goods/add_licai",params)
}
//首页贷款
export async function GetLoan(params) {
    return axios.creat_Token(axios.APIHost+"/api/index/loan",params)
}
//首页理财
export async function Getfinancial(params) {
    return axios.creat_Token(axios.APIHost+"/api/index/licai",params)
}
//贷款详情
export async function Getloaninfo(val) {
    return axios.read_Token(axios.APIHost+"/api/index/loan_info?id="+val)
}
//理财详情
export async function Detailinfo(val) {
    return axios.read_Token(axios.APIHost+"/api/index/licai_info?id="+val)
}
//收藏产品
export async function GetCollection(val) {
    return axios.read_Token(axios.APIHost+"/api/index/shou_loan?id="+val.id+"&type="+val.type)
}
//取消收藏
export async function StopCollection(val) {
    return axios.read_Token(axios.APIHost+"/api/index/quxiao?id="+val.id+"&type="+val.type)
}
//刷新数据
export async function Getnewinfo(params) {
    return axios.creat_Token(axios.APIHost+"/api/index/jisuan_loan",params)
}
//收藏列表
export async function Collectionlist(params) {
    return axios.read_Token(axios.APIHost+"/api/my/my_collection")
}
//提交贷款申请
export async function Agentloan(params) {
    return axios.creat_Token(axios.APIHost+"/api/my/apply_loan",params)
}
//提交理财申请
export async function Agentlicai(params) {
    return axios.creat_Token(axios.APIHost+"/api/my/apply_licai",params)
}
//我的贷款列表
export async function Myloanlist(params) {
    return axios.read_Token(axios.APIHost+"/api/my/my_loan")
}
//我的理财列表
export async function Mylist(params) {
    return axios.read_Token(axios.APIHost+"/api/my/my_licai")
}
//获取验证码
export async function Getcode(params) {
    return axios.create(axios.APIHost+"/api/login/code",params)
}
//修改密码
export async function Changepw(params) {
    return axios.create(axios.APIHost+"/api/login/edit_pwd",params)
}
//认证信息
export async function AuthId(params) {
    return axios.read_Token(axios.APIHost+"/api/my/is_renzheng")
}
//个人信息
export async function GetInfo(params) {
    return axios.read_Token(axios.APIHost+"/api/my/my_info")
}
// 获取会员说明
export async function GetVipInfo(params) {
    return axios.read_Token(axios.APIHost+"/api/vip/vip",params)
}
//提交付款凭证

export async function AgentPAY(params) {
    return axios.creat_Token(axios.APIHost+"/api/vip/apply_vip",params)
}
//判断vip
export async function GetVip(params) {
    return axios.read_Token(axios.APIHost+"/api/vip/is_vip",params)
}
// 获取付款图片
export async function Getpayimg(params) {
    return axios.read_Token(axios.APIHost+"/api/vip/ma",params)
}
//判断是否银行
export async function GetBank(params) {
    return axios.read_Token(axios.APIHost+"/api/vip/is_yv",params)
}
//服务协议
export async function GetAgreement(params) {
    return axios.read(axios.APIHost+"/api/uploads/fuwu")
}