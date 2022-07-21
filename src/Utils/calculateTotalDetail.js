export function calculateTotalDetail(fee, price, rate) {
    if(rate){
        var feeInUsd = fee / rate
        var total = feeInUsd+price 
        return '$'+total.toFixed(2)
    }else{
        return 'មិនមានអត្រាប្ដូរប្រាក់'
    }
}
