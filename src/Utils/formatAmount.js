export default amount => (amount).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
