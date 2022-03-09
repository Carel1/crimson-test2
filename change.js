function count(total, jumlah20, jumlah50, jumlah100) {
    const uang20 = 20000
    const uang50 = 50000
    const uang100 = 100000
    const uangsisa = 0
    var jmlLembar20 = 0
    var jmlLembar50 = 0
    var jmlLembar100 = 0

    var sisa100 = 0
    var sisa50 = 0
    var sisa20 = 0
    var totalSisa = 0

    function getBatas(total, uang, stok) {
        var batas = stok
        
        if(Math.floor(total / uang) < stok) {
            batas = Math.floor(total / uang)
        }
        return batas
    }

    if(total < uang100) {
        jmlLembar50 = getBatas(total, uang50, jumlah50)
        sisa50 = total - jmlLembar50 * uang50
        jmlLembar20 = getBatas(sisa50, uang20, jumlah20)
    } 
    if(total < uang50) {
        jmlLembar20 = getBatas(total, uang20, jumlah20)
        totalSisa = total - jmlLembar20 * uang20 
    } 
    if(total < uang20) {
        totalSisa = total

        if(sisa50 >= uangsisa) {
            sisa20 = sisa50 - jmlLembar20 * uang20
        }
        totalSisa = sisa20
        } 
        else {
        jmlLembar100 = getBatas(total, uang100, jumlah100)

        sisa100 = total - jmlLembar100 * uang100
        
        if(sisa100 >= uang50) {
            jmlLembar50 = getBatas(sisa100, uang50, jumlah50)
            sisa50 = sisa100 - jmlLembar50 * uang50
        } else {
            sisa50 = sisa100
        }

        if(sisa50 >= uang20) {
            jmlLembar20 = getBatas(sisa50, uang20, jumlah20)
            sisa20 = sisa50 - jmlLembar20 * uang20
        } else {
            sisa20 = sisa50
        }

        totalSisa = sisa20
    }

    const data = {
        totalSisa, jmlLembar20, jmlLembar50, jmlLembar100
    }

    return data
}

$(document).ready(function() {
    document.getElementById("hasilTukar").style.display = "none"
});

$("#tombol-tukar").click(function() {
    if(document.getElementById("total").value < 20000 || document.getElementById("pecahan20").value <= 0 || document.getElementById("pecahan50").value <= 0 || document.getElementById("pecahan100").value <= 0) 
    return alert("Tidak Bisa menukar uang dibawah Rp 20.000!")

    const total = Number(document.getElementById("total").value)
    const pecahan20 = Number(document.getElementById("pecahan20").value)
    const pecahan50= Number(document.getElementById("pecahan50").value)
    const pecahan100 = Number(document.getElementById("pecahan100").value)
    const data = count(total, pecahan20, pecahan50, pecahan100)

    document.getElementById("jmlLembar20").innerHTML = data.jmlLembar20
    document.getElementById("jmlLembar50").innerHTML = data.jmlLembar50
    document.getElementById("jmlLembar100").innerHTML = data.jmlLembar100
    
    document.getElementById("totalSisa").innerHTML = data.totalSisa

    document.getElementById("hasilTukar").style.display = "block"
    document.getElementById("initSection").style.display = "none"
});