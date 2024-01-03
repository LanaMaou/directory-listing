document.getElementById("checkAll").addEventListener("change", function () {
  const checkboxes = document.getElementsByName("images[]");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = this.checked;
  }
});
