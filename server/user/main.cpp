#include<iostream>
#include<vector>

int main(){
    std::cout << "Cloud Ide App" << std::endl;
    std::vector<int> arr;
    for(int i=0;i<10;i++){
        arr.push_back(i);
    }
    int sum=0;
    for(int i=0;i<arr.size();i++){
        sum+=arr[i];
    }
    std::cout<<"Sum: "<<sum<<std::endl;

    return 0;
}