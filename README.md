# Caesar cipher CLI tool

CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

### Installation

**Downloading**

Close this repository

**Installing**

Installing NPM modules globally to use this application as CLI

```sh
$ npm install -g .
```

**Run script with options**

CLI tool accept 4 options (short alias and full name):

1.  **-s, --shift** [Required]: a shift value can be positive or negative
2.  **-i, --input** [Optional]: an input file
3.  **-o, --output** [Optional]: an output file
4.  **-a, --action** [Required]: an action encode/decode

**Usage example:**

1. _-a (--action)_ is **encode**

```bash
$ caesar-cipher -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ caesar-cipher --action encode --shift 7 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
   _Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ caesar-cipher --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _Negative shift handling_

```bash
$ caesar-cipher --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
