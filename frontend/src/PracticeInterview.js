import React, { useState, useRef } from 'react';
import './PracticeInterview.css';

function PracticeInterview() {
  const [stage, setStage] = useState('type'); // type, difficulty, language, interview, sequentialMode, overview
  const [interviewType, setInterviewType] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [finished, setFinished] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sequentialMode, setSequentialMode] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0); // 0: technical, 1: aptitude, 2: hr, 3: communication
  const [allModuleAnswers, setAllModuleAnswers] = useState({});
  const [selectedSequentialDifficulty, setSelectedSequentialDifficulty] = useState(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const languages = ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Go', 'Rust', 'PHP'];
  const modules = ['technical', 'aptitude', 'hr', 'communication'];
  const moduleNames = { technical: 'Technical Interview', aptitude: 'Aptitude Interview', hr: 'HR Interview', communication: 'Communication Interview' };

  // Function to shuffle array
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Function to get random questions based on difficulty
  const getRandomQuestions = (questionList, count = 5) => {
    return shuffleArray(questionList).slice(0, count);
  };

  const questionSets = {
    
    technical: {
      Python: {
        easy: [
          { q: 'What is Python and why is it popular?', guidance: 'Discuss readability, simplicity, and wide use cases.' },
          { q: 'What is the difference between a list and a tuple?', guidance: 'Explain mutability and use cases.' },
          { q: 'What are variables and how do you declare them in Python?', guidance: 'Python uses dynamic typing.' },
          { q: 'Explain what a function is and how to define it in Python.', guidance: 'def keyword, parameters, return statement.' },
          { q: 'What are the basic data types in Python?', guidance: 'int, float, string, bool, list, dict, tuple.' },
          { q: 'How do you create a dictionary in Python?', guidance: 'Key-value pairs, access using keys.' },
          { q: 'What is a loop and why is it useful?', guidance: 'for and while loops, iteration over data.' },
          { q: 'Explain conditional statements (if-else) in Python.', guidance: 'Boolean logic, elif, nested conditions.' },
          { q: 'What is an import statement in Python?', guidance: 'Using modules and libraries.' },
          { q: 'How do you handle errors in Python with try-except?', guidance: 'Error handling basics, exception types.' },
        ],
        moderate: [
          { q: 'What are list comprehensions in Python and give an example?', guidance: 'Explain syntax and provide a real example like filtering or transforming data.' },
          { q: 'Explain the difference between == and is operators in Python.', guidance: 'Discuss value comparison vs identity comparison with examples.' },
          { q: 'How do decorators work in Python? Provide an example.', guidance: 'Explain function wrapping and show a practical use case.' },
          { q: 'What are generators and yield keyword? Why use them?', guidance: 'Discuss memory efficiency and lazy evaluation with examples.' },
          { q: 'What is a lambda function and when would you use it?', guidance: 'Anonymous functions, map/filter with lambdas.' },
          { q: 'Explain the concept of classes and objects in Python.', guidance: '__init__, self, methods, attributes.' },
          { q: 'What is the difference between a class variable and an instance variable?', guidance: 'Scope, shared state, examples.' },
          { q: 'How does Python handle memory management?', guidance: 'Reference counting basics.' },
          { q: 'What are built-in functions like map, filter, and reduce?', guidance: 'Functional programming concepts.' },
          { q: 'Explain the concept of inheritance in Python.', guidance: 'Parent and child classes, method overriding.' },
        ],
        difficult: [
          { q: 'What is the Global Interpreter Lock (GIL) in Python?', guidance: 'Explain threading implications and when it matters for performance.' },
          { q: 'Explain the concept of inheritance and method resolution order (MRO) in Python.', guidance: 'Discuss single and multiple inheritance, super() function, and MRO algorithm.' },
          { q: 'What are context managers and the with statement? Give an example.', guidance: '__enter__ and __exit__ methods, file handling, resource management.' },
          { q: 'How does Python handle memory management and garbage collection?', guidance: 'Reference counting, cyclic references, gc module.' },
          { q: 'Explain the difference between deep copy and shallow copy.', guidance: 'Impact on nested objects, copy module, practical implications.' },
          { q: 'What are metaclasses and when would you use them?', guidance: 'Advanced OOP, class creation, type manipulation.' },
          { q: 'Explain async/await and asynchronous programming in Python.', guidance: 'asyncio, event loop, coroutines.' },
          { q: 'What is monkey patching and what are its implications?', guidance: 'Runtime modification of classes/functions, risks and benefits.' },
          { q: 'Explain the descriptor protocol in Python.', guidance: '__get__, __set__, __delete__, property decorators.' },
          { q: 'What are slots and how do they improve performance?', guidance: '__slots__ in classes, memory optimization.' },
        ]
      },
      Java: {
        easy: [
          { q: 'What is Java and what are its key features?', guidance: 'Object-oriented, platform-independent, secure.' },
          { q: 'What is the JVM and why is it important?', guidance: 'Bytecode compilation, "Write once, run anywhere".' },
          { q: 'What is the difference between a class and an object?', guidance: 'Blueprint vs instance.' },
          { q: 'How do you create a class in Java?', guidance: 'class keyword, fields, methods, constructors.' },
          { q: 'What are the four access modifiers in Java?', guidance: 'public, private, protected, default (package-private).' },
          { q: 'What is a constructor and what is its purpose?', guidance: 'Initializing objects, special method.' },
          { q: 'Explain the concept of inheritance in Java.', guidance: 'extends keyword, parent and child classes.' },
          { q: 'What are arrays and how do you declare them in Java?', guidance: 'Fixed size, index-based access.' },
          { q: 'What is the difference between ArrayList and arrays?', guidance: 'Dynamic size, methods, flexibility.' },
          { q: 'What is a method and how do you define it in Java?', guidance: 'Parameters, return types, method overloading.' },
        ],
        moderate: [
          { q: 'What is the difference between ArrayList and LinkedList?', guidance: 'Discuss time complexity for add/remove/access operations.' },
          { q: 'What is polymorphism and how is it achieved in Java?', guidance: 'Method overriding, method overloading, dynamic dispatch.' },
          { q: 'What is an interface and how does it differ from an abstract class?', guidance: 'Contracts, multiple inheritance, when to use each.' },
          { q: 'Explain the concept of static members in Java.', guidance: 'Static variables, static methods, class-level data.' },
          { q: 'What is exception handling and how do you use try-catch in Java?', guidance: 'Checked vs unchecked exceptions, finally block.' },
          { q: 'What is the difference between a String and StringBuffer?', guidance: 'Mutability, performance, thread safety.' },
          { q: 'What are generics and why are they useful?', guidance: 'Type safety, elimination of casting.' },
          { q: 'Explain the concept of immutability in Java.', guidance: 'final keyword, benefits, String immutability.' },
          { q: 'What is the equals() method and how should it be overridden?', guidance: 'Value comparison, contract, hashCode relationship.' },
          { q: 'What is the difference between pass by value and pass by reference?', guidance: 'Java parameter passing mechanism.' },
        ],
        difficult: [
          { q: 'Explain the concept of multithreading and thread synchronization.', guidance: 'Discuss race conditions, locks, and synchronized methods.' },
          { q: 'What are the SOLID principles in Java?', guidance: 'Explain each principle with practical examples.' },
          { q: 'How does garbage collection work in Java?', guidance: 'Discuss memory management and GC algorithms.' },
          { q: 'Explain the concept of streams and functional programming in Java.', guidance: 'Stream API, filter, map, reduce, lambda expressions.' },
          { q: 'What is the difference between checked and unchecked exceptions?', guidance: 'Exception hierarchy, try-catch, throws keyword, best practices.' },
          { q: 'How does the equals() and hashCode() method work in Java?', guidance: 'Contract between methods, HashMap behavior, overriding guidelines.' },
          { q: 'What is reflection in Java and when should it be used?', guidance: 'Class.forName(), getDeclaredMethods(), performance considerations.' },
          { q: 'Explain the concept of concurrent collections and thread safety.', guidance: 'ConcurrentHashMap, Collections.synchronizedList(), performance.' },
          { q: 'What is the volatile keyword and how does it work?', guidance: 'Memory visibility, happens-before relationships, atomicity.' },
          { q: 'Explain the fork-join framework and parallel processing in Java.', guidance: 'RecursiveTask, ForkJoinPool, work stealing algorithm.' },
        ]
      },
      JavaScript: {
        easy: [
          { q: 'What is JavaScript and where is it used?', guidance: 'Client-side scripting, browsers, Node.js.' },
          { q: 'What are variables and how do you declare them?', guidance: 'var, let, const differences and scoping.' },
          { q: 'What are the basic data types in JavaScript?', guidance: 'string, number, boolean, undefined, null, object, symbol.' },
          { q: 'How do you create a function in JavaScript?', guidance: 'Function declaration, expression, arrow functions.' },
          { q: 'What is an object and how do you create one?', guidance: 'Key-value pairs, object literals, constructors.' },
          { q: 'What is an array and how do you access its elements?', guidance: 'Index-based access, array methods.' },
          { q: 'What are conditional statements in JavaScript?', guidance: 'if-else, switch-case, ternary operator.' },
          { q: 'What are loops and how do you use them?', guidance: 'for, while, do-while, for-in, for-of loops.' },
          { q: 'What is the difference between == and ===?', guidance: 'Type coercion vs strict equality.' },
          { q: 'How do you handle errors in JavaScript?', guidance: 'try-catch-finally, throwing errors.' },
        ],
        moderate: [
          { q: 'Explain closures in JavaScript with an example.', guidance: 'Show how functions access outer scope variables and practical use cases.' },
          { q: 'What is the difference between var, let, and const?', guidance: 'Discuss scope, hoisting, and temporal dead zone.' },
          { q: 'What are promises and how do they work?', guidance: 'Promise states (pending, fulfilled, rejected), chaining, error handling.' },
          { q: 'Explain the this keyword and how it works in different contexts.', guidance: 'Global scope, function context, object methods, arrow functions, bind/call/apply.' },
          { q: 'What is destructuring and how is it used in JavaScript?', guidance: 'Array and object destructuring, rest operator, practical examples.' },
          { q: 'Explain template literals and string interpolation.', guidance: 'Backticks, ${expression}, multiline strings.' },
          { q: 'What is prototypal inheritance in JavaScript?', guidance: 'Explain prototype chain and Object.create().' },
          { q: 'How do you handle asynchronous operations in JavaScript?', guidance: 'Callbacks, promises, async/await.' },
          { q: 'What is the spread operator and when do you use it?', guidance: 'Array spreading, object spreading, function arguments.' },
          { q: 'Explain the concept of callbacks in JavaScript.', guidance: 'Higher-order functions, callback hell, async operations.' },
        ],
        difficult: [
          { q: 'Explain the event loop and how async operations work.', guidance: 'Discuss callbacks, promises, and async/await.' },
          { q: 'How do you implement the Module Pattern in JavaScript?', guidance: 'IIFE, encapsulation, privacy, revealing module pattern.' },
          { q: 'Explain async/await and how it differs from promises.', guidance: 'Syntax, error handling, readability, async functions.' },
          { q: 'What is the difference between microtasks and macrotasks?', guidance: 'Event loop, Promise callbacks, setTimeout behavior.' },
          { q: 'Explain the concept of hoisting in JavaScript.', guidance: 'Variable hoisting, function hoisting, temporal dead zone.' },
          { q: 'What is the concept of currying and partial application?', guidance: 'Function transformation, practical applications.' },
          { q: 'Explain WeakMap and WeakSet and their use cases.', guidance: 'Weak references, memory management, garbage collection.' },
          { q: 'How does prototypal inheritance chain work in detail?', guidance: 'Constructor functions, Object.create(), __proto__ vs prototype.' },
          { q: 'What are Symbols in JavaScript and when to use them?', guidance: 'Unique identifiers, private properties, well-known symbols.' },
          { q: 'Explain the Proxy and Reflect APIs in JavaScript.', guidance: 'Metaprogramming, interceptors, validation patterns.' },
        ]
      },
      'C++': {
        easy: [
          { q: 'What is C++ and what are its key characteristics?', guidance: 'Object-oriented, low-level access, efficiency.' },
          { q: 'What is the difference between C and C++?', guidance: 'Object-oriented features, classes, templates.' },
          { q: 'What are variables and how do you declare them in C++?', guidance: 'Type declaration, initialization.' },
          { q: 'What are the basic data types in C++?', guidance: 'int, float, double, char, bool.' },
          { q: 'How do you declare and define a function in C++?', guidance: 'Syntax, parameters, return types.' },
          { q: 'What are classes and objects in C++?', guidance: 'Object-oriented programming basics.' },
          { q: 'What is a pointer and how do you use it?', guidance: 'Address, dereferencing, pointer syntax.' },
          { q: 'What is a reference in C++ and how does it differ from pointers?', guidance: 'Null-ability, syntax, use cases.' },
          { q: 'What is the difference between stack and heap memory?', guidance: 'Allocation, lifetime, performance.' },
          { q: 'What are arrays and how do you declare them?', guidance: 'Fixed size, indexing, multidimensional arrays.' },
        ],
        moderate: [
          { q: 'Explain the concept of constructors and destructors in C++.', guidance: 'Object initialization, resource cleanup.' },
          { q: 'What is operator overloading and provide examples.', guidance: 'Arithmetic, comparison, stream operators, best practices.' },
          { q: 'What is inheritance and how is it implemented in C++?', guidance: 'Public, private, protected inheritance.' },
          { q: 'Explain virtual functions and polymorphism in C++.', guidance: 'Dynamic dispatch, vtable, override keyword.' },
          { q: 'What are templates and template specialization in C++?', guidance: 'Generic programming, compile-time specialization.' },
          { q: 'What are STL containers and iterators?', guidance: 'vector, map, set, list, deque, complexity.' },
          { q: 'What is the difference between struct and class in C++?', guidance: 'Default access, usage conventions.' },
          { q: 'How do you handle exceptions in C++?', guidance: 'try-catch-throw, exception safety.' },
          { q: 'What is const correctness in C++?', guidance: 'const members, const parameters, benefits.' },
          { q: 'Explain friend functions and friend classes in C++.', guidance: 'Access control exceptions, use cases.' },
        ],
        difficult: [
          { q: 'Explain RAII (Resource Acquisition Is Initialization).', guidance: 'Discuss memory management and automatic resource cleanup.' },
          { q: 'What are smart pointers and how do they differ from raw pointers?', guidance: 'Discuss unique_ptr, shared_ptr, and weak_ptr.' },
          { q: 'Explain move semantics and std::move.', guidance: 'Explain lvalue/rvalue and performance benefits.' },
          { q: 'How does virtual function resolution work?', guidance: 'Discuss vtable and polymorphism implementation.' },
          { q: 'Explain template metaprogramming in C++.', guidance: 'Discuss compile-time computation and type safety.' },
          { q: 'What is the pimpl (Pointer to Implementation) idiom?', guidance: 'Encapsulation, compilation time reduction, ABI stability.' },
          { q: 'Explain perfect forwarding and std::forward in C++.', guidance: 'Template parameter deduction, forwarding references.' },
          { q: 'What is expression templates and how are they used?', guidance: 'Advanced template techniques, performance optimization.' },
          { q: 'Explain concepts in modern C++ and their purpose.', guidance: 'Template constraints, compile-time checks.' },
          { q: 'What is the curiously recurring template pattern (CRTP)?', guidance: 'Compile-time polymorphism, static dispatch.' },
        ]
      },
      'C#': {
        easy: [
          { q: 'What is C# and its key features?', guidance: 'Managed language, .NET framework, object-oriented.' },
          { q: 'What are the basic data types in C#?', guidance: 'int, float, double, string, bool, char.' },
          { q: 'How do you declare variables in C#?', guidance: 'Type declaration, var keyword.' },
          { q: 'What are classes and objects in C#?', guidance: 'Object-oriented programming basics.' },
          { q: 'What is a method and how do you define it?', guidance: 'Parameters, return types, method signature.' },
          { q: 'What are properties in C# and how do they work?', guidance: 'Auto-properties, getters, setters.' },
          { q: 'What is an array and how do you create one?', guidance: 'Index-based access, multidimensional arrays.' },
          { q: 'What is a namespace and why is it used?', guidance: 'Code organization, avoiding naming conflicts.' },
          { q: 'What is inheritance and how is it implemented?', guidance: 'base keyword, method overriding.' },
          { q: 'What are interfaces and how do they differ from classes?', guidance: 'Contracts, multiple implementation.' },
        ],
        moderate: [
          { q: 'Explain the concept of delegates and events in C#.', guidance: 'Delegate declaration, event handling, publisher-subscriber pattern.' },
          { q: 'What is LINQ and how is it used in C#?', guidance: 'Query syntax, method syntax, filters, projections, joins.' },
          { q: 'Explain async/await and Task-based asynchronous programming.', guidance: 'Task, async methods, await operator, error handling.' },
          { q: 'What is the difference between value types and reference types?', guidance: 'Stack vs heap, boxing/unboxing, struct vs class.' },
          { q: 'What are generics and how do you use them?', guidance: 'Generic classes, generic methods, constraints.' },
          { q: 'Explain exception handling best practices in C#.', guidance: 'try-catch-finally, custom exceptions, graceful degradation.' },
          { q: 'What is the using statement and how does it work?', guidance: 'IDisposable, resource management, finally block.' },
          { q: 'What are extension methods and when to use them?', guidance: 'Adding methods to existing types, practical examples.' },
          { q: 'Explain nullable types and null coalescing in C#.', guidance: 'Nullable<T>, ?, ??, null-safe operations.' },
          { q: 'What are anonymous types and when do you use them?', guidance: 'var keyword, LINQ queries, property initialization.' },
        ],
        difficult: [
          { q: 'Explain dependency injection and how it improves code.', guidance: 'IoC container, constructor injection, service registration.' },
          { q: 'What is reflection in C# and practical use cases?', guidance: 'Type information, method invocation, serialization, performance.' },
          { q: 'Explain expression trees and their use in LINQ.', guidance: 'Dynamic query building, lambda expressions, compilation.' },
          { q: 'What is covariance and contravariance in C#?', guidance: 'Generic type variance, IEnumerable<T>, IComparer<T>.' },
          { q: 'Explain the observer pattern and IObservable/IObserver.', guidance: 'Reactive programming, event-driven architecture.' },
          { q: 'What is the difference between dynamic and object?', guidance: 'Runtime type checking, DLR, performance implications.' },
          { q: 'Explain the strategy pattern and implementation in C#.', guidance: 'Defining algorithm families, runtime selection.' },
          { q: 'What are lambda expressions and expression-bodied members?', guidance: 'Functional programming, inline implementations.' },
          { q: 'Explain the factory pattern and its variants.', guidance: 'Object creation, decoupling, simple vs abstract factories.' },
          { q: 'What is the async/await state machine under the hood?', guidance: 'Compiler transformation, continuation, synchronization context.' },
        ]
      },
      Go: {
        easy: [
          { q: 'What is Go and why was it created?', guidance: 'Simplicity, concurrency, compiled language.' },
          { q: 'What are the basic data types in Go?', guidance: 'int, float64, string, bool, rune, byte.' },
          { q: 'How do you declare variables in Go?', guidance: 'var keyword, short declaration, initialization.' },
          { q: 'What are functions and how do you define them?', guidance: 'func keyword, parameters, multiple return values.' },
          { q: 'What are packages in Go and how do you use them?', guidance: 'Package structure, imports, public/private.' },
          { q: 'What is the difference between exported and unexported names?', guidance: 'Capitalization, visibility, scoping.' },
          { q: 'What are structs and how do you use them?', guidance: 'Field definition, embedding, methods.' },
          { q: 'What are interfaces in Go?', guidance: 'Interface definition, implementation, duck typing.' },
          { q: 'How do you handle errors in Go?', guidance: 'Error interface, error wrapping, idiomatic patterns.' },
          { q: 'What are slices and how do they differ from arrays?', guidance: 'Dynamic size, backing array, slice operations.' },
        ],
        moderate: [
          { q: 'Explain goroutines and how they differ from threads.', guidance: 'Lightweight concurrency, scheduler, goroutine pools.' },
          { q: 'What are channels and how are they used for communication?', guidance: 'Send/receive, buffered/unbuffered, select statement.' },
          { q: 'Explain the defer keyword and its use cases.', guidance: 'Deferred execution, cleanup operations, panic recovery.' },
          { q: 'What is the interface{} type and how is it used?', guidance: 'Empty interface, type assertions, type switches.' },
          { q: 'Explain error handling in Go compared to exceptions.', guidance: 'Error interface, error wrapping, best practices.' },
          { q: 'What is the difference between pointers and values in Go?', guidance: 'Receiver types, pass by reference vs value, performance.' },
          { q: 'What are methods and receivers in Go?', guidance: 'Value vs pointer receivers, method sets.' },
          { q: 'What is type assertion and type switch in Go?', guidance: 'Runtime type checking, interface conversion.' },
          { q: 'Explain concurrency patterns in Go.', guidance: 'Worker pools, fan-out/fan-in, pipelines.' },
          { q: 'What is the sync package and when should it be used?', guidance: 'Mutex, WaitGroup, RWMutex, concurrent map safety.' },
        ],
        difficult: [
          { q: 'Explain the context package and its importance.', guidance: 'Context propagation, timeouts, cancellation signals.' },
          { q: 'What are test files and how do you write unit tests in Go?', guidance: 'Testing conventions, assertions, table-driven tests.' },
          { q: 'Explain the io and bufio packages in Go.', guidance: 'Reader/Writer interfaces, buffered I/O.' },
          { q: 'What is the reflect package and when should it be used?', guidance: 'Runtime type introspection, performance implications.' },
          { q: 'Explain the encoding/json package and marshaling.', guidance: 'Struct tags, JSON marshaling, custom types.' },
          { q: 'What are select statements and how do they work?', guidance: 'Multiplexing channels, default cases, blocking behavior.' },
          { q: 'Explain the init function and package initialization.', guidance: 'Execution order, initialization side effects.' },
          { q: 'What is the http package and how do you build web servers?', guidance: 'Server setup, handlers, middleware patterns.' },
          { q: 'Explain interface segregation and composition in Go.', guidance: 'Small interfaces, embedding, interface design.' },
          { q: 'What are build tags and how are they used?', guidance: 'Platform-specific code, conditional compilation.' },
        ]
      },
      Rust: {
        easy: [
          { q: 'What is Rust and what problems does it solve?', guidance: 'Memory safety, concurrency, performance.' },
          { q: 'What are the basic data types in Rust?', guidance: 'i32, f64, bool, String, char.' },
          { q: 'How do you declare variables in Rust?', guidance: 'let keyword, mutability, shadowing.' },
          { q: 'What is the difference between let and const?', guidance: 'Immutability, compile-time evaluation.' },
          { q: 'How do you define functions in Rust?', guidance: 'fn keyword, parameters, return types.' },
          { q: 'What are if expressions in Rust?', guidance: 'Conditional logic, if-else chains, if-let.' },
          { q: 'What are loops and how do you use them?', guidance: 'loop, while, for, loop control.' },
          { q: 'What are tuples and how do you use them?', guidance: 'Fixed-size collections, destructuring.' },
          { q: 'What are structs and how do you define them?', guidance: 'Field definition, initialization, methods.' },
          { q: 'What is the match keyword and pattern matching?', guidance: 'Match expressions, patterns, exhaustiveness.' },
        ],
        moderate: [
          { q: 'Explain ownership and borrowing in Rust.', guidance: 'Ownership rules, move semantics, mutable/immutable borrows.' },
          { q: 'What are lifetimes and why are they important?', guidance: 'Lifetime annotations, scope rules, preventing dangling references.' },
          { q: 'Explain the Result and Option types in Rust.', guidance: 'Error handling, unwrap vs expect, matching patterns.' },
          { q: 'What is the difference between String and &str in Rust?', guidance: 'Owned vs borrowed strings, string literals, conversions.' },
          { q: 'Explain pattern matching and the match keyword.', guidance: 'Pattern syntax, guards, exhaustiveness checking.' },
          { q: 'What is a trait and how is it used for abstraction?', guidance: 'Trait definition, implementation, trait bounds.' },
          { q: 'How do you implement Error handling in Rust?', guidance: 'Result<T,E>, Option<T>, question mark operator.' },
          { q: 'What are enums and how do they work?', guidance: 'Variant definition, pattern matching, associated data.' },
          { q: 'What are closures in Rust?', guidance: 'Closure syntax, capture modes, move semantics.' },
          { q: 'Explain iterators and the Iterator trait.', guidance: 'Iterator methods, lazy evaluation, adaptors.' },
        ],
        difficult: [
          { q: 'Explain concurrency primitives in Rust.', guidance: 'Threads, channels, Arc, Mutex, fearless concurrency.' },
          { q: 'What is the borrow checker and how does it prevent bugs?', guidance: 'Memory safety, compile-time checks, no data races.' },
          { q: 'Explain macros and procedural macros in Rust.', guidance: 'Declarative macros, derive macros, meta-programming.' },
          { q: 'What are unsafe blocks and when should they be used?', guidance: 'FFI, unsafe operations, invariants.' },
          { q: 'Explain trait objects and dynamic dispatch in Rust.', guidance: 'dyn keyword, vtable, polymorphism.' },
          { q: 'What is the async/await system in Rust?', guidance: 'Futures, async functions, executors, select!.' },
          { q: 'Explain the Pin and Unpin trait in Rust.', guidance: 'Self-referential structs, async safety.' },
          { q: 'What is the derive macro and how do you create custom ones?', guidance: 'Procedural macros, code generation, attributes.' },
          { q: 'Explain interior mutability in Rust.', guidance: 'Cell, RefCell, Mutex, runtime borrow checking.' },
          { q: 'What is zero-cost abstraction in Rust?', guidance: 'Compile-time optimization, performance.' },
        ]
      },
      PHP: {
        easy: [
          { q: 'What is PHP and where is it used?', guidance: 'Server-side scripting, web development, databases.' },
          { q: 'What are variables and how do you declare them in PHP?', guidance: '$ symbol, dynamic typing.' },
          { q: 'What are the basic data types in PHP?', guidance: 'string, int, float, bool, array, null.' },
          { q: 'How do you create an array in PHP?', guidance: 'Array syntax, associative arrays, indexed arrays.' },
          { q: 'What are functions and how do you define them?', guidance: 'function keyword, parameters, return values.' },
          { q: 'How do you handle form data in PHP?', guidance: '$_GET, $_POST, $_REQUEST superglobals.' },
          { q: 'What is a session and how do you use it?', guidance: '$_SESSION array, session_start(), storing data.' },
          { q: 'What are cookies and how do you set them?', guidance: 'setcookie(), $_COOKIE array, expiration.' },
          { q: 'What are classes and objects in PHP?', guidance: 'class keyword, $this, properties, methods.' },
          { q: 'How do you handle errors and exceptions?', guidance: 'try-catch-finally, throw keyword.' },
        ],
        moderate: [
          { q: 'Explain the difference between single and double quotes in PHP.', guidance: 'Variable interpolation, parsing differences, performance.' },
          { q: 'What are anonymous functions and closures in PHP?', guidance: 'Function syntax, use keyword, variable capture.' },
          { q: 'Explain namespaces and their benefits.', guidance: 'Namespace organization, use statements, avoiding conflicts.' },
          { q: 'What is type hinting and why should it be used?', guidance: 'Type declarations, return types, strict types.' },
          { q: 'Explain the concept of traits in PHP.', guidance: 'Trait composition, method reuse, conflict resolution.' },
          { q: 'What is the difference between static and instance methods?', guidance: 'Method scope, access, when to use each.' },
          { q: 'What are interfaces and abstract classes in PHP?', guidance: 'Contract definition, implementation, polymorphism.' },
          { q: 'What is inheritance and how is it implemented?', guidance: 'extends keyword, parent classes, method overriding.' },
          { q: 'Explain error handling with exceptions in PHP.', guidance: 'try-catch-finally, custom exceptions, error logging.' },
          { q: 'What are magic methods in PHP?', guidance: '__construct, __get, __set, __call, etc.' },
        ],
        difficult: [
          { q: 'Explain dependency injection and frameworks like Laravel.', guidance: 'Service container, binding, resolving dependencies.' },
          { q: 'What is autoloading and how do Composer and PSR standards help?', guidance: 'PSR-4, namespace mapping, package management.' },
          { q: 'Explain reflection and metadata in PHP.', guidance: 'ReflectionClass, method inspection, annotations.' },
          { q: 'What is late static binding and how does it work?', guidance: 'static keyword, vs self, inheritance behavior.' },
          { q: 'Explain generators and yield keyword in PHP.', guidance: 'Memory efficiency, lazy evaluation, iterators.' },
          { q: 'What are design patterns and common ones in PHP?', guidance: 'MVC, factory, singleton, repository patterns.' },
          { q: 'Explain variadics and argument unpacking in PHP.', guidance: '... operator, variable-length arguments.' },
          { q: 'What is the SPL (Standard PHP Library)?', guidance: 'Interfaces, classes, iterators, data structures.' },
          { q: 'Explain OOP concepts: polymorphism, encapsulation, abstraction.', guidance: 'Real-world implementation in PHP.' },
          { q: 'What is type coercion and type juggling in PHP?', guidance: 'Weak typing, strict comparison, best practices.' },
        ]
      }
    },
    aptitude: {
      easy: [
        { q: 'A train travels 120 km in 2 hours. What is its speed?', guidance: 'Speed = Distance / Time' },
        { q: 'If a shirt costs Rs. 500 and is sold at 20% discount, what is the selling price?', guidance: 'Selling price = 500 - (20% of 500)' },
        { q: 'A simple interest on Rs. 1000 for 1 year at 5% per annum is?', guidance: 'SI = (P × R × T) / 100' },
        { q: 'The ratio of boys to girls is 3:2. If there are 20 girls, how many boys?', guidance: '3:2 = boys:20. Solve the proportion.' },
        { q: 'What is 25% of 200?', guidance: 'Percentage = (Value/100) × 100' },
        { q: 'A number multiplied by 3 gives 45. What is the number?', guidance: '3x = 45. Solve for x.' },
        { q: 'If A = 10 and B = 5, what is A + B?', guidance: 'Simple addition: 10 + 5 = 15' },
        { q: 'What is the area of a square with side 5 cm?', guidance: 'Area = side × side' },
        { q: 'A shopkeeper buys at Rs. 100 and sells at Rs. 150. Profit percentage?', guidance: '(Profit/Cost) × 100' },
        { q: 'If the sum of two numbers is 20 and one is 8, what is the other?', guidance: '8 + x = 20. Solve for x.' },
      ],
      moderate: [
        { q: 'A train travels 120 km in 2 hours and 150 km in 3 hours. What is its average speed for the total journey?', guidance: 'Total distance / total time. Calculate carefully.' },
        { q: 'If the simple interest on Rs. 1000 for 2 years is Rs. 200, what is the rate of interest per annum?', guidance: 'SI = (P × R × T) / 100. Solve for R.' },
        { q: 'A pipe can fill a tank in 6 hours and another pipe can empty it in 9 hours. How long will it take to fill if both are open?', guidance: 'Work rates: 1/6 - 1/9 = combined rate' },
        { q: 'In a group of 30 people, 18 like coffee and 12 like tea. If 8 like both, how many like neither?', guidance: 'Use set theory: Total = Coffee + Tea - Both + Neither' },
        { q: 'A car travels 300 km in 5 hours. If it maintains the same speed, how far will it travel in 8 hours?', guidance: 'Speed = distance/time. Use this to find distance in 8 hours.' },
        { q: 'The compound interest on Rs. 1000 at 5% for 2 years is?', guidance: 'CI = P(1+R/100)^T - P' },
        { q: 'In a class, 60% are boys. If there are 40 boys, how many girls?', guidance: 'Set up equation: 60% of x = 40. Solve for x.' },
        { q: 'A number is increased by 25% and then decreased by 20%. What is the net change?', guidance: 'Apply percentage changes sequentially.' },
        { q: 'If 3 workers can complete a job in 10 days, how many days will 5 workers take?', guidance: 'Inverse proportion: More workers = Less days' },
        { q: 'The LCM of 12, 18, and 24 is?', guidance: 'Find prime factorization and take highest powers.' },
      ],
      difficult: [
        { q: 'Two trains travel towards each other from cities 300 km apart at speeds of 60 km/h and 40 km/h. When will they meet?', guidance: 'Combined speed = 60 + 40 = 100. Time = Distance / Speed' },
        { q: 'A person buys a car for Rs. 500,000. After 3 years, it depreciates by 10% each year. What is its value?', guidance: 'Final Value = P(1 - R/100)^T' },
        { q: 'If 5% of x equals 20% of y, what is the ratio of x to y?', guidance: '0.05x = 0.20y. Solve for x:y' },
        { q: 'A container has milk and water in ratio 3:2. If 5 liters of mixture is removed and replaced with water, ratio becomes 1:1. Find initial milk quantity.', guidance: 'Set up equations based on milk and water quantities.' },
        { q: 'The average of 5 numbers is 20. If one number is removed, the average becomes 18. What was the removed number?', guidance: 'Sum changes when average changes.' },
        { q: 'A man walks at 4 km/h and reaches a destination 5 minutes late. If he walks at 5 km/h, he reaches 10 minutes early. What is the distance?', guidance: 'Set up equations for both speeds.' },
        { q: 'If x^2 + y^2 = 25 and x + y = 7, find xy.', guidance: '(x+y)^2 = x^2 + 2xy + y^2. Use this.' },
        { q: 'A discount of 20% on an item gives a profit of 20%. If the cost is Rs. 100, what is the marked price?', guidance: 'SP = CP × (100+Profit%)/100. MP = SP × 100/(100-Discount%)' },
        { q: 'In a race, A finishes 100m ahead of B who finishes 100m ahead of C. If all run at constant speed, how far is A ahead of C?', guidance: 'Use ratios of speeds derived from positions.' },
        { q: 'If a boat travels upstream at 8 km/h and downstream at 12 km/h, what is the speed of the boat in still water?', guidance: 'Speed in still water = (Upstream + Downstream) / 2' },
      ]
    },
    hr: {
      easy: [
        { q: 'Tell me about yourself in 2 minutes.', guidance: 'Education → Experience → Skills → Interest in this role' },
        { q: 'Why do you want to work for our company?', guidance: 'Research company, align values, show genuine interest.' },
        { q: 'What are your strengths?', guidance: 'Choose 2-3 relevant strengths with examples.' },
        { q: 'What are your weaknesses?', guidance: 'Be honest but show how you are addressing them.' },
        { q: 'Where do you see yourself in 5 years?', guidance: 'Show ambition, growth, and alignment with company goals.' },
        { q: 'Why did you leave your previous job?', guidance: 'Be professional, focus on growth opportunities.' },
        { q: 'What do you know about our company?', guidance: 'Research beforehand, show specific knowledge.' },
        { q: 'What is your expected salary?', guidance: 'Research market rates, be flexible and realistic.' },
        { q: 'When can you join?', guidance: 'Be clear about notice period and availability.' },
        { q: 'Do you have any questions for us?', guidance: 'Ask about role, team, company culture, growth opportunities.' },
      ],
      moderate: [
        { q: 'Describe a conflict with a colleague and how you resolved it.', guidance: 'Use STAR: Situation, Task, Action, Result. Show empathy.' },
        { q: 'What is your biggest weakness and how are you addressing it?', guidance: 'Be honest, show self-awareness and growth mindset.' },
        { q: 'Give an example of a time you showed leadership. What was the outcome?', guidance: 'Use STAR method, quantify results, show impact.' },
        { q: 'How do you handle pressure and tight deadlines?', guidance: 'Give specific examples, show problem-solving approach.' },
        { q: 'Describe a situation where you had to learn something new quickly.', guidance: 'Show adaptability, learning ability, and determination.' },
        { q: 'What do you know about our company and this role?', guidance: 'Research beforehand, show enthusiasm and specific knowledge.' },
        { q: 'Tell me about a time you failed and what you learned from it.', guidance: 'Show reflection, learning, and improvement.' },
        { q: 'How do you work in a team?', guidance: 'Highlight collaboration, communication, and shared goals.' },
        { q: 'What motivates you in your work?', guidance: 'Align motivation with company values and role.' },
        { q: 'How do you stay updated with industry trends?', guidance: 'Mention learning methods, courses, conferences, reading.' },
      ],
      difficult: [
        { q: 'Tell me about a time you had to manage a difficult stakeholder or client.', guidance: 'Show patience, communication, problem-solving skills.' },
        { q: 'Describe a time when your approach didn\'t work. How did you pivot?', guidance: 'Show flexibility, adaptability, learning from failure.' },
        { q: 'Tell me about a time you had to deliver bad news to a team or client.', guidance: 'Show professionalism, empathy, and solution-oriented approach.' },
        { q: 'How do you prioritize when you have multiple urgent tasks?', guidance: 'Explain prioritization framework, examples, time management.' },
        { q: 'Describe your experience with managing teams or mentoring others.', guidance: 'Show leadership, development of talent, impact.' },
        { q: 'Tell me about your greatest achievement and why it matters to you.', guidance: 'Quantify impact, show passion, career significance.' },
        { q: 'How would you approach a project with ambiguous requirements?', guidance: 'Show clarification skills, planning, stakeholder management.' },
        { q: 'What do you do when you disagree with your manager?', guidance: 'Show professionalism, respectfulness, and constructive approach.' },
        { q: 'How have you contributed to your previous company\'s success?', guidance: 'Quantify contributions, show business impact.' },
        { q: 'Tell me about a time you had to juggle multiple priorities across departments.', guidance: 'Show coordination, communication, and organizational skills.' },
      ]
    },
    communication: {
      easy: [
        { q: 'Introduce yourself to the interviewer.', guidance: 'Name, background, role, 1 sentence about interest.' },
        { q: 'Describe what you did in your last job in simple terms.', guidance: 'Clear, concise, role and key responsibilities.' },
        { q: 'What is one skill you\'re proud of?', guidance: 'Give example, explain why it matters, how you use it.' },
        { q: 'How would you describe your communication style?', guidance: 'Clear, collaborative, adaptable to audience.' },
        { q: 'Tell me about a hobby or interest outside of work.', guidance: 'Personal touch, show you\'re well-rounded.' },
        { q: 'How do you prefer to receive feedback?', guidance: 'Constructive, timely, specific examples.' },
        { q: 'Describe your ideal work environment.', guidance: 'Collaborative, growth-oriented, supportive team.' },
        { q: 'What is one thing you want to improve about yourself?', guidance: 'Show self-awareness and commitment to growth.' },
        { q: 'How do you stay organized?', guidance: 'Tools, methods, prioritization approach.' },
        { q: 'What do you enjoy most about your current/last role?', guidance: 'Align with the role you\'re interviewing for.' },
      ],
      moderate: [
        { q: 'Explain a complex technical concept to someone with no technical background.', guidance: 'Use analogies, simple language, avoid jargon. Clarity is key.' },
        { q: 'Present a project you worked on in 3 minutes.', guidance: 'Start with goal, challenges, solution, results. Be concise.' },
        { q: 'How do you handle feedback and criticism?', guidance: 'Show openness to learning and ability to accept constructive criticism.' },
        { q: 'Describe how you would explain your role to a person unfamiliar with it.', guidance: 'Be clear, concise, engaging. Use examples.' },
        { q: 'Tell a story about overcoming a challenge and what you learned.', guidance: 'Make it engaging, relevant, with clear lessons.' },
        { q: 'How do you keep your team informed about project progress?', guidance: 'Discuss communication methods, frequency, and clarity.' },
        { q: 'Describe your communication style and how you adapt it for different audiences.', guidance: 'Show flexibility, examples with different stakeholders.' },
        { q: 'How do you handle disagreements or opposing viewpoints in meetings?', guidance: 'Show listening skills, respect, collaborative problem-solving.' },
        { q: 'Tell me about a time you had to present to senior management.', guidance: 'Structure, key messages, engagement, confidence.' },
        { q: 'How would you explain a mistake you made to your manager?', guidance: 'Ownership, explanation, lessons learned, prevention.' },
      ],
      difficult: [
        { q: 'Tell me about a time you had to deliver bad news. How did you communicate it?', guidance: 'Empathy, clarity, solutions-oriented approach.' },
        { q: 'How would you persuade a skeptical colleague to try your innovative idea?', guidance: 'Evidence, benefits, addressing concerns, enthusiasm.' },
        { q: 'Describe a time when you had to communicate between technical and non-technical teams.', guidance: 'Translation of concepts, bridging gaps, clarity.' },
        { q: 'Tell me about your experience with cross-functional projects and communication.', guidance: 'Coordination, stakeholder management, conflict resolution.' },
        { q: 'How do you ensure your message is understood correctly?', guidance: 'Active listening, confirmation, feedback loops, clarity.' },
        { q: 'Describe a presentation that was not well-received. How did you handle it?', guidance: 'Reflection, adaptation, learning, resilience.' },
        { q: 'Tell me about a time you had to communicate change to a resistant team.', guidance: 'Empathy, clarity of benefits, involving team, managing resistance.' },
        { q: 'How do you handle miscommunication or conflict in a team?', guidance: 'Direct communication, understanding, resolution focus.' },
        { q: 'Describe your experience with written communication and documentation.', guidance: 'Clarity, structure, audience awareness, importance.' },
        { q: 'Tell me about a time you had to communicate through a crisis or difficult situation.', guidance: 'Transparency, reassurance, clear information, support.' },
      ]
    },
  };

// ...existing code...

  const calculateScore = (answer) => {
    if (answer === 'Skipped' || answer.trim() === '') return 0;
    const wordCount = answer.trim().split(/\s+/).length;
    const hasKeywords = /example|project|learned|improved|successfully|achieved/.test(answer.toLowerCase());
    const isDetailed = wordCount >= 40;
    
    let score = 50;
    if (isDetailed) score += 20;
    if (hasKeywords) score += 15;
    if (wordCount > 120) score += 15;
    
    return Math.min(score, 100);
  };

  const startListening = () => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      alert('Speech Recognition not supported. Type your answer instead.');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentAnswer(transcript);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakQuestion = () => {
    const currentQuestion = getQuestions()[currentQuestionIndex];
    const utterance = new SpeechSynthesisUtterance(currentQuestion.q);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const getQuestions = () => {
    if (sequentialMode) {
      const currentModule = modules[currentModuleIndex];
      if (currentModule === 'technical') {
        return getRandomQuestions(questionSets.technical[selectedLanguage][difficulty], 5);
      } else if (currentModule === 'aptitude') {
        return getRandomQuestions(questionSets.aptitude[difficulty], 5);
      } else if (currentModule === 'hr') {
        return getRandomQuestions(questionSets.hr[difficulty], 5);
      } else if (currentModule === 'communication') {
        return getRandomQuestions(questionSets.communication[difficulty], 5);
      }
    } else {
      if (interviewType === 'technical') {
        return getRandomQuestions(questionSets.technical[selectedLanguage][difficulty], 5);
      } else if (interviewType === 'aptitude') {
        return getRandomQuestions(questionSets.aptitude[difficulty], 5);
      } else if (interviewType === 'hr') {
        return getRandomQuestions(questionSets.hr[difficulty], 5);
      } else if (interviewType === 'communication') {
        return getRandomQuestions(questionSets.communication[difficulty], 5);
      }
    }
  };

  const handleAnswerSubmit = () => {
    const score = calculateScore(currentAnswer);
    const questions = getQuestions();
    const moduleKey = sequentialMode ? modules[currentModuleIndex] : interviewType;
    
    setAnswers([...answers, { 
      question: questions[currentQuestionIndex].q, 
      answer: currentAnswer, 
      score,
      module: moduleKey 
    }]);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next module in sequential mode
      if (sequentialMode && currentModuleIndex < modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentQuestionIndex(0);
        setAnswers([...answers, { 
          question: questions[currentQuestionIndex].q, 
          answer: currentAnswer, 
          score,
          module: moduleKey 
        }]);
      } else {
        setFinished(true);
      }
    }
  };

  const handleSkip = () => {
    const questions = getQuestions();
    const moduleKey = sequentialMode ? modules[currentModuleIndex] : interviewType;
    
    setAnswers([...answers, { 
      question: questions[currentQuestionIndex].q, 
      answer: 'Skipped', 
      score: 0,
      module: moduleKey 
    }]);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next module in sequential mode
      if (sequentialMode && currentModuleIndex < modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        setFinished(true);
      }
    }
  };

  const handleBack = () => {
    if (stage === 'interview') {
      setStage(sequentialMode ? 'sequentialMode' : 'difficulty');
    } else if (stage === 'sequentialMode') {
      setStage('type');
    } else if (stage === 'difficulty') {
      // Only go back to language selection if it was a technical interview
      setStage(interviewType === 'technical' ? 'language' : 'type');
    } else if (stage === 'language') {
      setStage('type');
    }
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer('');
    setFinished(false);
    setCurrentModuleIndex(0);
  };

  // Stage: Select Interview Type
  if (stage === 'type') {
    return (
      <div className="practice-container">
        <h2>Practice Interviews</h2>
        <div className="interview-types">
          <button 
            className="type-card sequential"
            onClick={() => {
              setSequentialMode(true);
              setStage('sequentialMode');
            }}
          >
            <div className="icon">🔄</div>
            <h3>Sequential Interview</h3>
            <p>Complete all 4 interview types: Technical → Aptitude → HR → Communication</p>
          </button>
          <button 
            className="type-card technical"
            onClick={() => {
              setSequentialMode(false);
              setInterviewType('technical');
              setStage('language');
            }}
          >
            <div className="icon">💻</div>
            <h3>Technical Interview</h3>
            <p>Choose a language and answer technical questions</p>
          </button>
          <button 
            className="type-card aptitude"
            onClick={() => {
              setSequentialMode(false);
              setInterviewType('aptitude');
              setStage('difficulty');
            }}
          >
            <div className="icon">🧮</div>
            <h3>Aptitude Interview</h3>
            <p>Solve math and logic puzzles</p>
          </button>
          <button 
            className="type-card hr"
            onClick={() => {
              setSequentialMode(false);
              setInterviewType('hr');
              setStage('difficulty');
            }}
          >
            <div className="icon">👔</div>
            <h3>HR Interview</h3>
            <p>Answer HR and behavioral questions</p>
          </button>
          <button 
            className="type-card communication"
            onClick={() => {
              setSequentialMode(false);
              setInterviewType('communication');
              setStage('difficulty');
            }}
          >
            <div className="icon">🎤</div>
            <h3>Communication Interview</h3>
            <p>Practice your communication and presentation skills</p>
          </button>
        </div>
      </div>
    );
  }

  // Stage: Select Difficulty for Sequential Mode
  if (stage === 'sequentialMode') {
    return (
      <div className="practice-container">
        <h2>Sequential Interview - Select Difficulty</h2>
        <p style={{marginBottom: '20px', fontSize: '16px'}}>You will complete 4 interview rounds: Technical (5 Qs) → Aptitude (5 Qs) → HR (5 Qs) → Communication (5 Qs)</p>
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <div className="difficulty-selection">
          <button 
            className="difficulty-btn easy"
            onClick={() => {
              setSelectedSequentialDifficulty('easy');
              setDifficulty('easy');
              setSelectedLanguage('Python'); // Default language for technical round
              setStage('interview');
            }}
          >
            <div className="level">Easy</div>
            <p>Basic concepts and fundamentals</p>
          </button>
          <button 
            className="difficulty-btn moderate"
            onClick={() => {
              setSelectedSequentialDifficulty('moderate');
              setDifficulty('moderate');
              setSelectedLanguage('Python'); // Default language for technical round
              setStage('interview');
            }}
          >
            <div className="level">Moderate</div>
            <p>Intermediate concepts and applications</p>
          </button>
          <button 
            className="difficulty-btn difficult"
            onClick={() => {
              setSelectedSequentialDifficulty('difficult');
              setDifficulty('difficult');
              setSelectedLanguage('Python'); // Default language for technical round
              setStage('interview');
            }}
          >
            <div className="level">Difficult</div>
            <p>Advanced concepts and complex scenarios</p>
          </button>
        </div>
      </div>
    );
  }

  // Stage: Select Language (for technical interview)
  if (stage === 'language') {
    return (
      <div className="practice-container">
        <h2>Select Programming Language</h2>
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <div className="language-grid">
          {languages.map((lang) => (
            <button
              key={lang}
              className="language-btn"
              onClick={() => {
                setSelectedLanguage(lang);
                setStage('difficulty');
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Stage: Select Difficulty
  if (stage === 'difficulty') {
    return (
      <div className="practice-container">
        <h2>Select Difficulty Level</h2>
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <div className="difficulty-selection">
          <button 
            className="difficulty-btn easy"
            onClick={() => {
              setDifficulty('easy');
              setStage('interview');
            }}
          >
            <div className="level">Easy</div>
            <p>Basic concepts and fundamentals</p>
          </button>
          <button 
            className="difficulty-btn moderate"
            onClick={() => {
              setDifficulty('moderate');
              setStage('interview');
            }}
          >
            <div className="level">Moderate</div>
            <p>Intermediate concepts and applications</p>
          </button>
          <button 
            className="difficulty-btn difficult"
            onClick={() => {
              setDifficulty('difficult');
              setStage('interview');
            }}
          >
            <div className="level">Difficult</div>
            <p>Advanced concepts and complex scenarios</p>
          </button>
        </div>
      </div>
    );
  }

  // Stage: Interview
  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  if (finished) {
    const moduleAnswers = {};
    const moduleScores = {};
    
    // Group answers by module
    answers.forEach(ans => {
      const mod = ans.module;
      if (!moduleAnswers[mod]) {
        moduleAnswers[mod] = [];
        moduleScores[mod] = [];
      }
      moduleAnswers[mod].push(ans);
      moduleScores[mod].push(ans.score);
    });

    const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0) / answers.length;
    const passedQuestions = answers.filter(ans => ans.score >= 50).length;
    
    return (
      <div className="practice-container">
        <button className="back-btn" onClick={handleBack}>← Back to Practice</button>
        <div className="interview-complete">
          <h2>Interview Completed! 🎉</h2>
          {sequentialMode && <p style={{fontSize: '18px', marginBottom: '15px'}}>Sequential Interview - All 4 Rounds</p>}
          <div className="score-summary">
            <h3>Overall Score: {totalScore.toFixed(2)} / 100</h3>
            <p>Questions Answered: {answers.length} / {answers.length}</p>
            <p>Questions Passed (≥50): {passedQuestions} / {answers.length}</p>
          </div>

          {sequentialMode && Object.keys(moduleAnswers).length > 0 && (
            <div className="module-breakdown" style={{marginTop: '30px', marginBottom: '20px'}}>
              <h3>Module Breakdown:</h3>
              {Object.keys(moduleAnswers).map((mod) => {
                const modScore = moduleScores[mod].reduce((a,b) => a+b, 0) / moduleScores[mod].length;
                return (
                  <div key={mod} style={{
                    padding: '12px',
                    margin: '10px 0',
                    backgroundColor: '#f5f5f5',
                    borderLeft: `4px solid ${modScore >= 70 ? '#28a745' : modScore >= 50 ? '#ffc107' : '#dc3545'}`,
                    borderRadius: '4px'
                  }}>
                    <strong>{moduleNames[mod]}:</strong> {modScore.toFixed(2)}/100
                  </div>
                );
              })}
            </div>
          )}

          <div className="answers-summary">
            <h3>Your Responses:</h3>
            {answers.map((ans, idx) => (
              <div key={idx} className={`answer-item score-${Math.round(ans.score / 20)}`}>
                <p style={{fontSize: '12px', color: '#666'}}>{sequentialMode ? ans.module.toUpperCase() + ' - ' : ''}Q{idx + 1}: {ans.question}</p>
                <p><strong>Your Answer:</strong> {ans.answer || 'No answer provided'}</p>
                <p className="score-badge">Score: {ans.score}/100</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const progress = sequentialMode 
    ? (((currentModuleIndex * 5 + currentQuestionIndex + 1) / 20) * 100)
    : ((currentQuestionIndex + 1) / questions.length) * 100;

  const currentModuleName = sequentialMode ? moduleNames[modules[currentModuleIndex]] : 
    (interviewType === 'technical' ? `${selectedLanguage} - Technical Interview` : 
    `${interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview`);

  return (
    <div className="practice-container">
      <button className="back-btn" onClick={handleBack}>← Back</button>
      <div className="interview-header">
        <h2>{currentModuleName}</h2>
        {sequentialMode && <p style={{fontSize: '14px', color: '#666'}}>Module {currentModuleIndex + 1} of 4</p>}
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        {sequentialMode 
          ? `Question ${currentQuestionIndex + 1} of 5 (Module ${currentModuleIndex + 1}/4)` 
          : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </p>

      <div className="interview-content">
        <div className="question-box">
          <h3 className="question">{currentQuestion.q}</h3>
          <button onClick={speakQuestion} className="speak-btn" disabled={isSpeaking}>
            {isSpeaking ? '🔊 Speaking...' : '🔊 Hear Question'}
          </button>
        </div>

        <div className="guidance-box">
          <p><strong>💡 Tips:</strong> {currentQuestion.guidance}</p>
        </div>

        <div className="answer-box">
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer or use voice input..."
            rows="6"
          />
          <p className="char-count">{currentAnswer.length} characters</p>
        </div>

        <div className="voice-controls">
          {!isListening ? (
            <button onClick={startListening} className="btn btn-voice">
              🎤 Start Speaking
            </button>
          ) : (
            <button onClick={stopListening} className="btn btn-stop">
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        <div className="button-group">
          <button onClick={handleSkip} className="btn btn-secondary">Skip</button>
          <button onClick={handleAnswerSubmit} className="btn btn-primary" disabled={!currentAnswer.trim()}>

            {sequentialMode 
              ? (currentModuleIndex === modules.length - 1 && currentQuestionIndex === questions.length - 1 ? 'Finish All' : 'Next')
              : (currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next')}
          </button>
        </div>
      </div>

      {/* Sequential Interview Section - only show at initial selection */}
      {stage === 'type' && (
        <div className="sequential-interview-section" style={{marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px'}}>
          <h3 style={{marginBottom: '15px', color: '#333'}}>Sequential Interview Mode</h3>
          <p style={{color: '#666', marginBottom: '15px'}}>
            Take a comprehensive interview covering all key areas in sequence:
          </p>
          <div className="sequential-modules" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px'}}>
            <div className="module-card" style={{padding: '15px', backgroundColor: '#fff', border: '2px solid #007bff', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#007bff'}}>📱 Technical Interview</h4>
              <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>Programming & Problem Solving</p>
              <span style={{fontSize: '12px', backgroundColor: '#e7f3ff', color: '#007bff', padding: '5px 10px', borderRadius: '20px'}}>5 Questions</span>
            </div>
            <div className="module-card" style={{padding: '15px', backgroundColor: '#fff', border: '2px solid #28a745', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#28a745'}}>🧮 Aptitude Interview</h4>
              <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>Logic & Reasoning</p>
              <span style={{fontSize: '12px', backgroundColor: '#e8f5e9', color: '#28a745', padding: '5px 10px', borderRadius: '20px'}}>5 Questions</span>
            </div>
            <div className="module-card" style={{padding: '15px', backgroundColor: '#fff', border: '2px solid #ffc107', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#ffc107'}}>💼 HR Interview</h4>
              <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>Behavioral & Soft Skills</p>
              <span style={{fontSize: '12px', backgroundColor: '#fff3e0', color: '#ffc107', padding: '5px 10px', borderRadius: '20px'}}>5 Questions</span>
            </div>
            <div className="module-card" style={{padding: '15px', backgroundColor: '#fff', border: '2px solid #dc3545', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#dc3545'}}>🎙️ Communication Interview</h4>
              <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>Communication Skills</p>
              <span style={{fontSize: '12px', backgroundColor: '#ffebee', color: '#dc3545', padding: '5px 10px', borderRadius: '20px'}}>5 Questions</span>
            </div>
          </div>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            <button 
              className="btn btn-primary"
              style={{flex: '1', minWidth: '150px'}}
              onClick={() => {
                setSequentialMode(true);
                setStage('interview');
                setCurrentModuleIndex(0);
                setCurrentQuestionIndex(0);
                setAnswers([]);
                setCurrentAnswer('');
                setFinished(false);
              }}
            >
              🚀 Start Sequential Interview
            </button>
            <button 
              className="btn btn-secondary"
              style={{flex: '1', minWidth: '150px'}}
              onClick={() => alert('Sequential mode combines all 4 interview types for a comprehensive evaluation experience!')}
            >
              ℹ️ Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticeInterview;
