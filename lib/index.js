/*****实现添加的功能******/
//1 给添加绑定事件,收集表达数据
$$('#add-user').onclick = function () {
  //console.log(1111);
  // 1-1 收集表单数据
  let title = $$('#title').value;
  let pos = $$('#pos').value;
  let idea = $$('#idea').value;
  //console.log(title, pos, idea);
  // 验证数据不能为空
  if (!title || !pos || !idea) return;
  // 2 将数据发送给php
  let data = 'idea=' + idea + '&pos=' + pos + '&title=' + title
  axios.post('http://localhost/day25/lib/server.php?fn=add', data).then(res => {
    //console.log(res);
    if (res == 1) {
      // 插入成功后,关闭弹出框,刷新页面
      //  console.log('success');
      $('#userAddModal').modal('toggle');
      location.reload();
    }
  })
}

/******实现数据列表*******/
function list () {
  axios.get('http://localhost/day25/lib/server.php?fn=sel').then(res => {

    // 将json转化为对象
    res = JSON.parse(res)
    //console.log(res);
    // 遍历数据,追加到页面中
    var str = '';
    res.forEach(ele => {
      //  console.log(ele);
      let { id, title, pos, idea } = ele
      str += `<tr class="user-${id}">
              <th scope="row">${id}</th>
              <td>${title}</td>
              <td>${pos}</td>
              <td>${idea}</td>
              <td><button type="button" class="btn btn-danger btn-sm"  data-toggle="modal" data-target="#userDelModal" onclick="delUser(${id})">删除</button>
              <button type="button" class="btn btn-warning btn-sm">修改</button></td>
              </tr>`;

    });

    // 追加到tbody中
    $$('tbody').innerHTML = str;
  });
}
list();
/**删除的实现**/
function delUser (id) {
  //console.log(id);
  // 将当前删除的信息,id.放到删除的模态框上
  $$('#del-user').setAttribute('user-id', id);
}

// 给删除绑定事件
$$('#del-user').onclick = function () {
  // 1  获取当前删除的id
  //console.log(this);
  let id = this.getAttribute('user-id');
  // 2 发送ajax删除
  axios.get('http://localhost/day25/lib/server.php?fn=del&id=' + id).then(res => {
    if (res == 1) {
      // 删除成功,关闭模态框,刷新页面
      $('#userDelModal').modal('toggle');
      //location.reload();

      // 无刷新删除
      $$('.user-' + id).remove();

    }
  })

}

// 节点获取的封装
function $$ (ele) {
  return document.querySelector(ele);
}