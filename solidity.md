## Solidity

State variables are permanently stored in contract storage. They are written to the Ethereum blockchain. 

- uint = unisgned integer, must be non-negative

Solidity provides more complex data type using structs.

There are 2 types of arrays: fixed arrays and dynamic arrays (no fixed size, can keep growing: unit[] dynArray)

If you declare array as public, then, Solidity creates a getter for it: 
Person[] public people; => other contracts would be able to read this array but not write. 

Functions: concention but not required to start a function with `_` to differentiate from global variables. 

Mark functions as private by default to avoid making your contract vulnerable to attacks. 

start private functions with `_`. private means only accessible in the contract. 

```
	function saySomething() public view/pure returns (string)
```	
=> add `view` to signify that function only viewing data but not modifying it
=> use `pute` to signify that function is not accessing any data in the app 

pseudo-random number generation using keccak256, version of sha3 
hash function maps a string to random 256-bit hexadecimal number 

Event: way for your contract to communicate to the front-end that sth happened on the blockchain. 

Ethereum has a Javascript library called Web3.js.

`mapping (address => uint) public accountBalance;`

`msg.sender` => global variable pointing to the address of the person or smart contract who called the current function 
=> using it gives security of blockchain

require makes it so that the function will throw an error and stop executing if some condition is not true. Condition must be true before running a function. 

### Inheritance 
Rather than making one extremely long contract, sometimes it makes sense to split your code logic across multiple contracts to organize the code.
Use `is` to inherit from parent class. 

### Storage vs memory 
In Solidity, there are two places you can store variables — in storage and in memory.

Storage refers to variables stored permanently on the blockchain. Memory variables are temporary, and are erased between external function calls to your contract. Think of it like your computer's hard disk vs RAM.

Most of the time you don't need to use these keywords because Solidity handles them by default. State variables (variables declared outside of functions) are by default storage and written permanently to the blockchain, while variables declared inside functions are memory and will disappear when the function call ends.

However, there are times when you do need to use these keywords, namely when dealing with structs and arrays within functions:

When using storage it modified the value on the blockchain, using memory allows to make a copy of the value on the blockchain. 

### Functions visibility 

In addition to public and private, Solidity has two more types of visibility for functions: internal and external.

internal is the same as private, except that it's also accessible to contracts that inherit from this contract.

external is similar to public, except that these functions can ONLY be called outside the contract — they can't be called by other functions inside that contract. We'll talk about why you might want to use external vs public later.

### Interacting with other contracts

- define an interface:  only define functions with which we want to interact and define prototype of the function ending it with a `;`

To use the interface in your contract: 
  - address NumberInterfaceAddress = 0xab38... 
    NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);

##  Characteristics of contracts
### Immutability 
- smart contracts are immutable, not possible to edit after deploy. If fix, then you create another contract and ask users to use its address. 
- external dependencies => when code is corrupted => better to have functions to update key portions of the Dapp, e.g. update address of external contract 

### Ownable Contracts 
- OpenZeppelin is a library of secure and community-vetted smart contracts that you can use in your own DApps.

### Function modifiers
- Function modifiers are kind of half-functions that are used to modify other functions, usually to check some requirements prior to execution. => can be used to restrict access to a function. 

- A function modifier looks just like a function, but uses the keyword modifier instead of the keyword function. And it can't be called directly like a function can — instead we can attach the modifier's name at the end of a function definition to change that function's behavior.

- Can take arguments

### Gas
- to run computation and store values, users have to pay gas. Hence better to have simple logic in your contract not to spend too much of it. 
- if you have multiple uint inside struct, solidity can pack these vars together to take up less storage. => use smallest uint possible to take less storage space. To pack data types together, put them at the end of a struct. 

- View functions do not cost any gas! So marking a function with view tells web3.js that it only needs to query your local Ethereum node to run the function, and it doesn't actually have to create a transaction on the blockchain (which would need to be run on every single node, and cost gas). If a view function is called internally from another function in the same contract that is not a view function, it will still cost gas. This is because the other function creates a transaction on Ethereum, and will still need to be verified from every node. So view functions are only free when they're called externally.

- One of the more expensive operations in Solidity is using storage — particularly writes. This is because every time you write or change a piece of data, it’s written permanently to the blockchain. Forever! Thousands of nodes across the world need to store that data on their hard drives, and this amount of data keeps growing over time as the blockchain grows. So there's a cost to doing that. In order to keep costs down, you want to avoid writing data to storage except when absolutely necessary. Sometimes this involves seemingly inefficient programming logic — like rebuilding an array in memory every time a function is called instead of simply saving that array in a variable for quick lookups. In most programming languages, looping over large data sets is expensive. But in Solidity, this is way cheaper than using storage if it's in an external view function, since view functions don't cost your users any gas. (And gas costs your users real money!).

You can use the memory keyword with arrays to create a new array inside a function without needing to write anything to storage. The array will only exist until the end of the function call, and this is a lot cheaper gas-wise than updating an array in storage — free if it's a view function called externally.


Notes: 
- You can pass a storage pointer to a struct as an argument to a private or internal function. 
- memory arrays must be created with a length argument (in this example, 3). They currently cannot be resized like storage arrays can with array.push(), although this may be changed in a future version of Solidity.both external view and pure do not cost gas 
- hard to implement randomness and stay safe at the same moment => solution is oracle
- transferring to address `0` is called burning a token, because no one has the private key => unrecoverable
- vassert is similar to require, where it will throw an error if false. The difference between assert and require is that require will refund the user the rest of their gas when a function fails, whereas assert will not. So most of the time you want to use require in your code; assert is typically used when something has gone horribly wrong with the code (like a uint overflow).
- commenting use natspec:
@title and @author are straightforward.
@notice explains to a user what the contract / function does. @dev is for explaining extra details to developers.
@param and @return are for describing what each parameter and return value of a function are for.
- ternary operator: (condition) ? ifTrue : ifFalse
- the block time for Ethereum is on average 15 seconds
- A wei is the smallest sub-unit of Ether — there are 10^18 wei in one ether.
- indexed keyword allows to filter in event listener

### Security 
- An important security practice is to examine all your public and external functions, and try to think of ways users might abuse them. 

### Modifiers
- there are visibility modifiers: public, ...
- there are state modifiers which tell us how the function interacts with the blockchain
- custom modifiers
- payable modifier: special type of functions that can receive Ether, require some amount of eth to run 

### Tokens 
- ERC20: A token on Ethereum is basically just a smart contract that follows some common rules — namely it implements a standard set of functions that all other token contracts share, such as transfer(address _to, uint256 _value) and balanceOf(address _owner).
Internally the smart contract usually has a mapping, mapping(address => uint256) balances, that keeps track of how much balance each address has.
-ERC721 tokens: good fit for crypto-collectibles. Unique and can only be traded as whole numbers. 


## Preventing overflows and underfows
- use library called safeMath
- A library is a special type of contract in Solidity. One of the things it is useful for is to attach functions to native data types.
- using SafeMath for uint256; => gives add, sub, mul, div
- First we have the library keyword — libraries are similar to contracts but with a few differences. For our purposes, libraries allow us to use the using keyword, which automatically tacks on all of the library's methods to another data type:
- So, simply put, SafeMath's add, sub, mul, and div are functions that do the basic 4 math operations, but throw an error if an overflow or underflow occurs.



## Web3.js 

- JavaScript library from the Ethereum Foundation called Web3.js.
- Ethereum network is made up of nodes, which each contrain a copy of the blockchain. When you want to call a function on a smart contract, you need to query one of these nodes and tell it: 
- the address of the smart contract
- the function you want to call and the variables you want to pass to the function

Ethereum nodes speak one language: JSON_RPC, web3.js hides these json queries


### Web3 Provider
- Setting a Web3 Provider in Web3.js tells our code which node we should be talking to handle our reads and writes. It's kind of like setting the URL of the remote web server for your API calls in a traditional web app.
- There's a 3rd party service that makes life easier so no need to maintain own Eth node, called Infura. 
- Infura is a service that maintains a set of Eth nodes with a caching layer for fast reads which can access for free through their API.
- Metamask = browser extension letting users mangae their Eth account and private keys, and use these accounts to interact with websites that are using web3.js. It uses Infura's servers under the hodd as a web3 provider. 

- Web3.js need contract address and ABI (Application Binary Interface): representation of your cotnracts' methods in JSON format that tells web4.js how to format function calls in a way your contract will understand. 

### Calling contract functions 
- call is used for view and pure functions. It only runs on the local node, and won't create a transaction on the blockchain
- send will create a transaction and change data on the blockchian, use it for any functions != view or pure.

### Subscribe to events in front-end
- Using events as a cheaper form of storage.

If you recall, saving data to the blockchain is one of the most expensive operations in Solidity. But using events is much much cheaper in terms of gas.

The tradeoff here is that events are not readable from inside the smart contract itself. But it's an important use-case to keep in mind if you have some data you want to be historically recorded on the blockchain so you can read it from your app's front-end.