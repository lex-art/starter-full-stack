## STARTER FULL STACK NEXT JS AND NEST JS

### This STARTER helps to init a project ready to implement you logic business

- For UI has been implemented Next js whit MUI and apply jwt with cookies, translations "es" | "en" languages, forms whit react-hook-forms with Zoad for validations and one catalogue of components.

- For Backend has been created whit Nest js, whit Email senders, upload files, encrypt data, type ORM, whit Postgres as data base. And session whit passport and JWT with possibility to use Google Auth or Facebook Auth


> [!IMPORTANT]  
> On Windows we need run this command for `bcrypt` library, if you use `pnpm`, if you have a problem try install `pnpm add -g node-gyp & pnpm add -g node-pre-gyp install`


```bash
$ cd .\node_modules\.pnpm\bcrypt@5.1.1_encoding@0.1.13
$ node-gyp install --fallback-to-build
$ cd .\node_modules\.\bcrypt\
$ node-pre-gyp install --fallback-to-build
```