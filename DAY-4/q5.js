
let height = [0,1,0,2,1,0,1,3,2,1,2,1];

let N = height.length;
    let max = -Infinity;
    let index;

   for(let i=0; i<N; i++){
    if(max < height[i]){
        max = height[i];
        index = i;
    }
   };

let ans = 0;
let val = -Infinity;
   for(let i=1; i<index; i++){
     val = Math.max(height[i-1],val);
    if(val > height[i]){
        ans += val - height[i];
    }
   }

 val = -Infinity;
   for(let i=N-2; i>index; i--){
     val = Math.max(height[i+1],height[i]);
    if(val > height[i]){
        ans += val - height[i];
    }
   }

   console.log(ans);
