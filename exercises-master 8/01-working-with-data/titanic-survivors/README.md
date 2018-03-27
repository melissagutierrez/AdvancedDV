# 01 Working with Data

Before we develop data visualizations, we must make sure the data we intend to work with is clean and code-ready. Using a spreadsheet is a common way of doing this.

The goal of this exercise is threefold: problem solve using a new tool (*hint: documentation*); identify good versus bad data and make the best of what you have; and determine strategies for cleaning data.

You may pair with another student in class to work on this exercise.

## Using Excel

Within this repo is `titanic-manifest.csv`. Import the CSV file to Microsoft Excel and answer the following questions:

- Which gender had the highest survival rate?
- Which passenger class had the highest survival rate?

If you have never used Excel before ... good. :) If you have, perhaps your methodology to answer these questions isn't the best approach.

You may use any form of documentation to assist you in finding the right tools within Excel to help you complete this task.

When you find an Excel feature which may help, consider testing it in a prototype setting before applying it to your data. Be sure to write down how this feature works and the steps to use it.


## Good vs. Bad Data

This isn't a great data set because many details are missing. We can still extract more information. Based on what is available, what other interesting details might be shared about the passengers? These can be related to the passengers as a whole, in small chunks (i.e. the survival rate of a given family), or individuals.

What are some questions which cannot be answered because of the lack of data?

Considering the Titanic sank in 1912 ... and record keeping was spotty at best in those days ... how might you inform users of discrepancies?  We will discuss this.


## Cleaning Data

What are some ways you could reformat the data to be code-friendly?  Develop a data dictionary for yourself to establish a standard for how the data which does exist would be handled with code. For instance, instead of using 1 / 0 for the 'survived' column, use Boolean values.

(It is not necessary for you to actually clean this data. Just write down how you might better segment and standardize the data.)
