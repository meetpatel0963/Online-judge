#include<bits/stdc++.h>
using namespace std;

#define IO    ios::sync_with_stdio(false);cin.tie(0);
#define int   long long
#define endl  '\n'

mt19937 rnd(time(0));

const int inf = 0x3f3f3f3f3f3f3f3fLL;
// const int inf = 2e9;

const int N = 3e5 + 10;
const int MOD = 1e9 + 7;
// const int MOD = 998244353; 


int32_t main(){

    IO

    int n;
    cin >> n;

    vector<int> a(n);
    for(int i = 0 ; i < n ; i++) cin >> a[i];

    vector<int> l(n), r(n);
    l[0] = r[n - 1] = 1;

    for(int i = 1 ; i < n ; i++)
        if(a[i] < a[i - 1])
            l[i] = l[i - 1] + 1;
        else
            l[i] = 1;
    
    for(int i = n - 2 ; i >= 0 ; i--)
        if(a[i] < a[i + 1])
            r[i] = r[i + 1] + 1;
        else
            r[i] = 1;

    int i = 0, j = n - 1, c = 0, prv = -1;

    while(i <= j){
        if(a[i] > a[j]){
            if((r[i] & 1) && a[i] > prv){
                cout << ((c & 1) ? "Bob" : "Alice") << endl;
                return 0;
            }
            else if(a[j] > prv){
                prv = a[j--];
            }
            else{
                cout << ((c & 1) ? "Alice" : "Bob") << endl;    
                return 0;
            }
        }
        else{
            if((l[j] & 1) && a[j] > prv){
                cout << ((c & 1) ? "Bob" : "Alice") << endl;
                return 0;   
            }
            else if(a[i] > prv){
                prv = a[i++];
            }
            else{
                cout << ((c & 1) ? "Alice" : "Bob") << endl;    
                return 0;
            }
        }

        c ^= 1;
    }

    cout << ((c & 1) ? "Alice" : "Bob") << endl;    

    return 0;
}