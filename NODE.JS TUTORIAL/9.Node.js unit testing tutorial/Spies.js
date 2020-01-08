/*
You can use spies to get information on function calls, 
like how many times they were called, 
or what arguments were passed to them.
*/

it('calls subscribers on publish', function () {
  var callback = sinon.spy()
  PubSub.subscribe('message', callback)

  PubSub.publishSync('message')

  assertTrue(callback.called)
})