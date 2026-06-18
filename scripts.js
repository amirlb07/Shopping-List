const input = document.getElementById("itemInput")
const addButton = document.getElementById("Add")
const list = document.getElementById("shoppingList")
const message = document.getElementById("message")
const messageText = document.getElementById("messageText")
const closeButton = document.getElementById("closeMessage")

let timeOutId

list.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const li = event.target.closest("li")
    const itemLabel = li.querySelector(".item-label")
    itemLabel.classList.toggle("completed")
  }
})

function showMessage(text) {
  messageText.textContent = text
  message.classList.add("visible")

  clearTimeout(timeOutId)
  timeOutId = setTimeout(() => {
    message.classList.remove("visible")
  }, 3000)
}

closeButton.addEventListener("click", () => {
  clearTimeout(timeOutId)
  message.classList.remove("visible")
})

list.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete")
  if (deleteBtn) {
    const item = deleteBtn.closest("li")
    if (item) {
      list.removeChild(item)
      showMessage("O item foi removido da lista.")
    }
  }
})

addButton.addEventListener("click", () => {
  const itemAdded = input.value.trim()
  if (itemAdded === "") return

  const li = document.createElement("li")

  const itemContent = document.createElement("div")
  itemContent.className = "item-content"

  const checkboxLabel = document.createElement("label")
  checkboxLabel.className = "checkbox"

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"

  const checkmark = document.createElement("span")
  checkmark.className = "checkmark"

  checkboxLabel.appendChild(checkbox)
  checkboxLabel.appendChild(checkmark)

  const label = document.createElement("label")
  label.className = "item-label"
  label.textContent = itemAdded

  itemContent.appendChild(checkboxLabel)
  itemContent.appendChild(label)

  const deleteButton = document.createElement("button")
  deleteButton.className = "delete"

  const trashIcon = document.createElement("div")
  trashIcon.className = "trash-icon"
  deleteButton.appendChild(trashIcon)

  li.appendChild(itemContent)
  li.appendChild(deleteButton)
  list.appendChild(li)

  input.value = ""
})
