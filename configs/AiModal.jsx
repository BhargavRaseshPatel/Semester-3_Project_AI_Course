
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

   export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Explain the concept in Detail on Topic: python Chapter: Python Fundamentals: Variables, Data Types, Operators, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"Variables\",\n    \"explanation\": \"Variables are like containers that store data in a program. They act as symbolic names for values, allowing you to manipulate and access data easily. To create a variable in Python, you assign a value to it using the equals sign (=).\",\n    \"code\": \"<precode>\\nname = \\\"Alice\\\"\\nage = 30\\n</precode>\"\n  },\n  {\n    \"title\": \"Data Types\",\n    \"explanation\": \"Data types define the kind of data a variable can hold. Python has several built-in data types, including:\\n\\n* **Integers (int):** Whole numbers, like 10, -5, 0.\\n* **Floats (float):** Numbers with decimal points, like 3.14, -2.5.\\n* **Strings (str):** Textual data, enclosed in quotes, like \\\"Hello, world!\\\" or 'Python'.\\n* **Booleans (bool):** Represent truth values, either True or False.\\n* **Lists (list):** Ordered collections of items, enclosed in square brackets, like [1, 2, 3].\\n* **Tuples (tuple):** Similar to lists, but immutable (cannot be modified), enclosed in parentheses, like (1, 2, 3).\\n* **Dictionaries (dict):** Key-value pairs, enclosed in curly braces, like {'name': 'Alice', 'age': 30}.\",\n    \"code\": \"<precode>\\n# Integers\\nnumber = 10\\n\\n# Floats\\npi = 3.14159\\n\\n# Strings\\nmessage = \\\"Hello, world!\\\"\\n\\n# Booleans\\nis_active = True\\n\\n# Lists\\ncolors = [\\\"red\\\", \\\"green\\\", \\\"blue\\\"]\\n\\n# Tuples\\ncoordinates = (10, 20)\\n\\n# Dictionaries\\nperson = {'name': 'Alice', 'age': 30}\\n</precode>\"\n  },\n  {\n    \"title\": \"Operators\",\n    \"explanation\": \"Operators are special symbols that perform operations on values or variables. Python supports various operators, including:\\n\\n* **Arithmetic Operators:**\\n    * `+` (Addition)\\n    * `-` (Subtraction)\\n    * `*` (Multiplication)\\n    * `/` (Division)\\n    * `%` (Modulo - Remainder of division)\\n    * `**` (Exponentiation)\\n    * `//` (Floor Division - Rounds down to the nearest integer)\\n\\n* **Comparison Operators:**\\n    * `==` (Equal to)\\n    * `!=` (Not equal to)\\n    * `>` (Greater than)\\n    * `<` (Less than)\\n    * `>=` (Greater than or equal to)\\n    * `<=` (Less than or equal to)\\n\\n* **Logical Operators:**\\n    * `and` (Logical AND - True if both operands are True)\\n    * `or` (Logical OR - True if at least one operand is True)\\n    * `not` (Logical NOT - Inverts the truth value of an operand)\\n\\n* **Assignment Operators:**\\n    * `=` (Assignment)\\n    * `+=` (Add and assign)\\n    * `-=` (Subtract and assign)\\n    * `*=` (Multiply and assign)\\n    * `/=` (Divide and assign)\\n    * `%=` (Modulo and assign)\\n    * `**=` (Exponentiation and assign)\\n    * `//=` (Floor division and assign)\\n\\n* **Bitwise Operators:** (Operate on bits at the binary level)\\n    * `&` (Bitwise AND)\\n    * `|` (Bitwise OR)\\n    * `^` (Bitwise XOR)\\n    * `~` (Bitwise NOT)\\n    * `<<` (Left shift)\\n    * `>>` (Right shift)\\n\\n* **Identity Operators:**\\n    * `is` (Checks if two objects are the same object)\\n    * `is not` (Checks if two objects are not the same object)\\n\\n* **Membership Operators:**\\n    * `in` (Checks if an item is present in a sequence)\\n    * `not in` (Checks if an item is not present in a sequence)\",\n    \"code\": \"<precode>\\n# Arithmetic Operations\\nresult = 10 + 5  # 15\\nresult = 10 - 5  # 5\\nresult = 10 * 5  # 50\\nresult = 10 / 5  # 2.0\\nresult = 10 % 3  # 1\\nresult = 10 ** 2  # 100\\nresult = 10 // 3  # 3\\n\\n# Comparison Operations\\nresult = 10 == 5  # False\\nresult = 10 != 5  # True\\nresult = 10 > 5  # True\\nresult = 10 < 5  # False\\nresult = 10 >= 5  # True\\nresult = 10 <= 5  # False\\n\\n# Logical Operations\\nresult = True and False  # False\\nresult = True or False  # True\\nresult = not True  # False\\n\\n# Assignment Operations\\nx = 10\\nx += 5  # x = 15\\n\\n# Identity Operations\\nx = [1, 2, 3]\\ny = [1, 2, 3]\\nresult = x is y  # False (different object instances)\\n\\n# Membership Operations\\ncolors = [\\\"red\\\", \\\"green\\\", \\\"blue\\\"]\\nresult = \\\"red\\\" in colors  # True\\nresult = \\\"yellow\\\" not in colors  # True\\n</precode>\"\n  }\n]\n```"},
        ],
      },
    ],});

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());