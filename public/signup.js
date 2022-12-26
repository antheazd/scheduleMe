import React from 'react'
import { Button, Form, Icon, Message } from 'semantic-ui-react'

const MessageExampleAttached = () => (
  <div>
    <Message
      attached
      header='Welcome to our site!'
      content='Fill out the form below to sign-up for a new account'
    />
    <Form className='attached fluid segment' method="post">
      <Form.Group widths='equal'>
        <Form.Input
          fluid
          label='Name'
          placeholder='Name'
          type='text'
          id="name" 
          name="name"
        />
        <Form.Input
          fluid
          label='Surname'
          placeholder='Surname'
          type='text'
          id="surname" 
          name="surname"
        />
        <Form.Input
          fluid
          label='Email address'
          placeholder='Email address'
          type='email'
          id="email" 
          name="email"
        />
        <Form.Input
          fluid
          label='Password'
          placeholder='Password'
          type="password" 
          id="password" 
          name="password"
        />
      </Form.Group>
      <Form.Input label='Username' placeholder='Username' type='text' />
      <Form.Input label='Password' type='password' />
      <Button color='blue'>Submit</Button>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
    </Message>
  </div>
)

export default MessageExampleAttached