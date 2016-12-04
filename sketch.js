var height, width, elementSize;
var bubbleSorter;

function setup() {
    width = 500;
    height = 500;
    elementSize = 10;
    createCanvas(500, 500);
    var elements = randomList(width/elementSize);
    bubbleSorter = new SteppedBubbleSorter(elements);
}

function randomList(amount){
    var result = [];
    for(var i = 0; i<amount; i++){
        result.push(i*elementSize);
    }
    shuffelArray(result);
    return result;
}

function shuffelArray(list) {
    var j, x, i;
    for (i = list.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = list[i - 1];
        list[i - 1] = list[j];
        list[j] = x;
    }
}

function draw() {
    background(51);
    stroke(0);
    fill(255);
    bubbleSorter.show();
    bubbleSorter.step();
}

function SteppedBubbleSorter(elements){
    this.elements = elements;
    this.currentIndex = 0;
    this.swapped = true;
    this.sortedIndex = this.elements.length-1;

    this.swap = function swap(index1, index2){
        var temp = this.elements[index1];
        this.elements[index1] = this.elements[index2];
        this.elements[index2] = temp;
        this.swapped = true;
    };

    this.step = function step(){
        if(this.currentIndex >= this.sortedIndex){
            if(this.swapped){
                this.currentIndex = 0;
                this.sortedIndex--;
                this.swapped = false;
            }
        } else {
            var a = this.elements[this.currentIndex];
            var b = this.elements[this.currentIndex+1];
            if(a<b){
                this.swap(this.currentIndex, this.currentIndex+1);
            }
            this.currentIndex++;
        }
    };
    this.show = function(){
        var self = this;
        this.elements.map(function(i, index){
            if(self.currentIndex === index || self.currentIndex+1 == index){
                fill(0, 255, 0);
            } else {
                fill(255);
            }
            ellipse(index*elementSize, i, elementSize, elementSize);
        });
    };
}
