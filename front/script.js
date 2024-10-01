// Dados do banco
// let arr = [
//   { id: 2, text: "praia" },
//   { id: 4, text: "campo" }
// ]

// $('#tags').select2({
//   tags: true,
//   data: arr,
//   tokenSeparators: [','],
//   placeholder: "Adicione suas tags...",
//   selectOnClose: true,
//   closeOnSelect: true
// });

async function teste() {
  console.log($("#tags").val())
  let options = $("#tags").val()

  let tag_ids = []
  let tag_text = []

  options.forEach((tag) => {
    if (isNaN(tag)) {
      tag_text.push(tag)
    } else {
      tag_ids.push(tag)
    }
  })

  let data = { id_user: 1, title: "teste", tag_ids, tag_text }

  const response = await fetch('http://localhost:3339/post/salvar', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const results = await response.json()

  console.log(results)
}

window.addEventListener('load', async () => {
  const response = await fetch('http://localhost:3339/tags/listar', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const results = await response.json();

  console.log(results.data);

  if (results.success) {
    $('#tags').select2({
      tags: true,
      data: results.data,
      tokenSeparators: [','],
      placeholder: "Adicione suas tags...",
      selectOnClose: true,
      closeOnSelect: true
    });
  }
})