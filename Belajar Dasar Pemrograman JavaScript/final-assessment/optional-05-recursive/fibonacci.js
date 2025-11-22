function fibonacci(n) {
    if (n === 0) {
        return [0];
    } else if (n === 1) {
        return [0, 1];
    } else {
        const seq = fibonacci(n - 1);
        seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
        return seq;
    }   
}
// Jangan hapus kode di bawah ini!
export default fibonacci;
