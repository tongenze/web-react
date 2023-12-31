import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from '../../Utils/index'
import { Button, Form, Input } from 'antd'
import { userLogin } from '../../API/api'
import './login.css'

const mapStateToProps = (state) => {
  return {
    state,
  }
}
class LoginView extends React.Component {
  componentDidMount() {}
  state = {
    form: this.props.useform[0],
  }
  //登录
  login = async () => {
    try {
      const values = await this.state.form.validateFields()
      //
      await userLogin(values).then((res) => {
        console.log(res)
      })
      console.log('Success:', values)

      //
      window.sessionStorage.setItem('token', values.username)
      const a = [1, 2, 3, 4]
      window.sessionStorage.setItem(
        'routers',
        window.btoa(window.encodeURIComponent(JSON.stringify(a))) //随便加个密
      )
      this.props.navigate('/home/welcome', { replace: true })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  //重置表单
  reset = () => {
    this.state.form.resetFields()
  }
  render() {
    const { form } = this.state
    return (
      <div className="login">
        <div className="login_form">
          <Form
            name="basic"
            form={form}
            style={{
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <div className="login_title">用户登录</div>
            <Form.Item
              label="用户名"
              name="usercode"
              labelCol={{ span: 5 }}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              labelCol={{ span: 5 }}
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button
                type="primary"
                onClick={this.login}
                style={{ marginRight: '20px' }}
              >
                登录
              </Button>
              <Button type="primary" onClick={this.reset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
//react-redux提供一个connect高阶组件帮助类组件拿到state和调用dispatch
export default withRouter(connect(mapStateToProps)(LoginView))
