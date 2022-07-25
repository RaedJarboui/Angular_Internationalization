1-this screen shows the list of languages that we gonna need in our translation module : as we see the table is in primeNg design. we can sort,filter and paginate using backend services.also the admin can add,delete and edit the language state (either activated or not).if languages is activated that means we can translate data
in that language :
![image](https://user-images.githubusercontent.com/48753442/180739074-8759b8e9-cfab-4c16-af7d-c8b37bfa3e48.png)

2-Implement library ngx-translate (I18n) to translate visual content :
![image](https://user-images.githubusercontent.com/48753442/180739346-ae40fc26-c0d2-4b1c-a07b-fc16e22bf9c0.png)
![image](https://user-images.githubusercontent.com/48753442/180739361-1386cc5e-1345-4a03-ab43-bf6bf18fd455.png)

3-list of tables stored in database : admin can check or uncheck the state of table.if it's chechekd that mean that admin can access to columns of that table and access to their data.
![image](https://user-images.githubusercontent.com/48753442/180739798-afe7d6f5-09ff-490f-9032-7207e0d20220.png)

4- this list of columns related to table "Event" that shows the different columns in table event and which columns are traductible or not depending on type of that column
![image](https://user-images.githubusercontent.com/48753442/180740127-06b1a2e0-0027-44d4-b90a-5bb5c50a2232.png)

5- this screen display the dictionnary which contains : the field value (the word to translate) and on top there is the activated languages.
admin can add or edit values of translation for every word and the translation values gonna be stored in table translation in database :
![image](https://user-images.githubusercontent.com/48753442/180741889-8e086df0-54b0-48ce-9d4f-89026c2c1ec9.png)

6-this screen shows the translation for the third party tables which have json columns :
![image](https://user-images.githubusercontent.com/48753442/180742051-260540a8-41a4-4dde-aa92-11bbfd6d7171.png)
those tables have 2 columns : Column 1 named (Table_abacus_name) and the other one named (Value_Json). the "Value_Json" column depends of the value Table_abacus_name.
Each value in column Table_abacus_name have her own structure of json in column value Json
for the first select we gonna retrieve all values inside (table_abacus_name) then we gonna parse all the json from column "Value_Json" related to value seletced in table_abacus_name. then wg gonna parse the json and recuperate only the keys that have translateble data and show all these data.
 7- Intégration Virtual Keyboard :This functionality has been added and aims to simplify the addition of translation values ​​by the administrator. Indeed, when writing the values of the translations in the text fields, the pc keyboard only allows writing with the languages ​​(French, English) but if for example the administrator has added the Chinese, Japanese or for example Russian.
Our keyboards do not support these languages. They do not contain the appropriate alphabets for these languages. Where does this idea of ​​integrating a virtual keyboard come from, the administrator can activate or deactivate this keyboard by clicking on the keyboard icon above the page for assigning translation values ​​in case he has to assign a value of translation with a language other than French or English.
This functionality will help us to avoid going for example to a window and writing the translation value in google translate for example and then copying this value and pasting it in the text field.
![image](https://user-images.githubusercontent.com/48753442/180745332-236872d6-319a-4039-9eb0-34b0c88341cc.png)

8- Autocomplete : 
This is another feature developed which is based on the principle of autocomplete which is inspired by sites like Yamli, google translate. This feature provides suggestions as we type in the field. It allows the administrator to quickly find and select a pre-populated list of values ​​as they are entered, taking advantage of search and filtering. For example the client wants to assign a translation value for a word, he starts typing in the text field which is located at the same line as the word and at the same language column French.
If he tries to write "ja" for example, a list of suggestions will appear under the field that contains the values ​​"java, javascript". If it writes "javas" , only the word "javascript" will appear.
These lists of suggestions are retrieved from the translations made previously on other words and which are stored in the database in the translation table. Also the list of suggestions is displayed according to the language or the administrator writes the value of translation.
![image](https://user-images.githubusercontent.com/48753442/180745659-870516fb-3920-454d-97aa-94ae5896f924.png)

9-Translation of Word documents
This feature is not like the other two features mentioned above. It is not meant to simplify the translation task when assigning translation values. But rather it consists of uploading a Word file by the administrator and translating its content.
Then he indicates the language with which the content of this file is written with , then he indicates the language to which he wants to translate this Word document.
as soon as he clicks on the translate button, the Word document content will be translated with the language that the admin has already selected.
This functionality is achieved through a python script which mainly requires 3 variables: the language from , the language to and the text to be translated.

![image](https://user-images.githubusercontent.com/48753442/180745891-fdcd1154-2be8-4665-b7af-0e4bb47874ef.png)

10-retrieval of translated values in the HMI

![image](https://user-images.githubusercontent.com/48753442/180746064-9d21a5cc-de0a-4a71-8e6f-d30ab7fd1d17.png)


-----> and finally this is the structure of table Translation that gonna store the values with their translation values :
![image](https://user-images.githubusercontent.com/48753442/180746234-15b62443-0e40-4f62-9331-97d6f3291566.png)






# ArchitectUI - Angular 11 Bootstrap 5

This admin dashboard was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

ArchitectUI is among the most popular admin panels based on Angular that you can use for any SaaS or webapp. It comes in other versions too, such as [Vue](https://dashboardpack.com/theme-details/architectui-dashboard-vue-pro), [React](https://dashboardpack.com/theme-details/architectui-dashboard-react-pro) and [HTML/jQuery](https://dashboardpack.com/theme-details/architectui-dashboard-html-pro/). 

Pro version for ArchitectUI based on Angular 11 is available [here](https://dashboardpack.com/theme-details/architectui-angular-7-bootstrap-material-design-pro).

## ArchitectUI Preview

![ArchitectUI Angular 11 admin dashboard template](https://colorlib.com/wp/wp-content/uploads/sites/2/architectui-angular-free.jpg)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
