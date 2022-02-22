describe('String Calculator', function() {
    // 1
    beforeEach(function() {
        var fixture = `<div id="fixture">
        <input id="input-numbers" type="text">
        <input id="add-btn" type="button" value="Add">
        <div><span id="result" /></div>
        </div>`
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture)
    })

    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'))
    })
    // 2
    beforeEach(function() {
        init()
    })
    // 3
    it('should return 0 for empty string', function () {
        document.getElementById('input-numbers').value = ''
        document.getElementById('add-btn').click()
        expect(document.getElementById('result').innerHTML).toBe('0')
    })
    it('should return 6 for 1,2,3', function() {
        document.getElementById('input-numbers').value = '1,2,3'
        document.getElementById('add-btn').click()
        expect(document.getElementById('result').innerHTML).toBe('6')
    })
    it('should return 7000 for 1000,1000,5000', () => {
        document.getElementById('input-numbers').value = '1000,1000,5000'
        document.getElementById('add-btn').click()
        expect(document.getElementById('result').innerHTML).toBe('7000')
    })
})