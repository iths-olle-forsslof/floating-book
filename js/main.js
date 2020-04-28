class RandomLetters {
    constructor() {
        this.currentString = 0
        this.currentLength = 0
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.symbols = '@!#$%&?½§£'
        this.fadeBuffer = false
        this.strings = ['exMag #1 is here', 'for KICKSTARTER BACKERS only', 'Please enjoy!']
        this.place = document.querySelector('.random-text')
    }

    showWord(word = this.strings[this.currentString]) {
        this.place.innerHTML = word
    }

    //makes a random string same length as currentString
    generateRandomString(length) {
        let randomString = ''
        while (randomString.length < length) {
            randomString += this.symbols.charAt(Math.floor(Math.random() * this.symbols.length))
        }
        return randomString
    }

    //
    initAnimation() {
        if (this.currentLength < this.strings[this.currentString].length) {
            this.currentLength = this.strings[this.currentString].length
         
            let newString = this.generateRandomString(this.currentLength);
            
            this.place.innerHTML = newString;

            setTimeout(()=>{
                this.animateNewWord()
            }, 50)
        }
    }

    // saves each letter in the next string together with a counter value. 
    // Depending on the counter val. that's how many random letters are shown
    // before the right letter appear.
    animateNewWord() {
        if(this.fadeBuffer == false) {
            this.fadeBuffer = []
            for (let i = 0; i < this.strings[this.currentString].length; i++) {
                this.fadeBuffer.push({count: Math.floor(Math.random()*12)+1, letter: this.strings[this.currentString].charAt(i)})
            }
        }
        
        let cycles = false;
        let newString = '';

        for (let i = 0; i < this.fadeBuffer.length; i++) {
            let fader = this.fadeBuffer[i]
            if (fader.count > 0) {
                cycles = true
                fader.count--
                newString += this.symbols.charAt(Math.floor(Math.random()*this.symbols.length))
            } else {
                newString += fader.letter
            }
        }

        this.place.innerHTML = newString

        if (cycles == true) {
            setTimeout(() => {
                this.animateNewWord()
            }, 50)
        }
    }

    checkCurrentString(typeOfEvent) {
        if (this.currentString == this.strings.length - 1) {
            this.currentString = 0 
        } else if (this.currentString == 0) {
            this.currentString++ 
        } else if (this.currentString == 1) {
            this.currentString++
        }

        this.currentLength = 0
        this.fadeBuffer = false
        this.showWord(this.strings[this.currentString])
    }

    init(event) {
        setInterval(()=>{
            this.checkCurrentString(event)
            this.initAnimation()
        },2000)
        
    }
}

let test = new RandomLetters()
test.showWord()
test.init()


