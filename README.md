***Note: Carefully check the case-sensitivity!! Otherwise project won't work!***

Where to store: C:/Users/Your_Name/InstaVeritas

We will use:

Anaconda Navigator!
Python 3.10 (Ensure you have Python installed: Download)

Now in Jupyter Notebook, click new > new terminal, write these commands as follows:

Path must show: C:/Users/Your_Name/InstaVeritas>>

Firstly, make an env using,

>> python -m venv venv

Necessary Libraries:

>> pip install pandas numpy scikit-learn flask

>> pip install flask

Make sure requirements.txt is empty. If it is not empty, clear it and save it and then run,

>> pip freeze > requirements.txt


Now, how to run it!

>> venv/Scripts/activate

>> python app.py

It will show running on some link, hover over that link press "ctrl+mouse click"
