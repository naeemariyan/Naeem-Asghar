function update_selected_variants(p_id){
  var productSelection = document.querySelectorAll("#product-variants-"+p_id+" select");
  console.log(productSelection[0].value)
  var productSelection = document.querySelectorAll("#product-variants-"+p_id+" input[type=radio]");
  console.log(productSelection[0].value)
  
  console.log("changed", this.value);
}