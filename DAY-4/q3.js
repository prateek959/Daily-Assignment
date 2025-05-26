
let nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;
let len = nums1.length;
    let end = len - 1;
      while(n > 0 && m > 0){
        if(nums1[m-1] >= nums2[n-1]){
            nums1[end] = nums1[m-1];
            m--;
        }
        else{
            nums1[end] = nums2[n-1];
            n--;
        }
        end--;
    }

    while(n > 0){
        nums1[end] = nums2[n-1];
        end--;
        n--;
    }