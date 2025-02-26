
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import RegisterForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Order
from django.contrib import messages
from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)    # logs in the user
            print(f"Successful login for {username}!")
            return redirect("pizzaApp/previous-orders/")  # Redirect to previous orders page
        else:
            print(f"fLogin failed for {username}")
            messages.error(request, "Invalid username or password")
            return render(request, "pizzaApp/index.html", {"error": "Invalid username or password"})

    return render(request, "pizzaApp/index.html")
  
def register_view(request):
     if request.method == "POST":
       form = RegisterForm(request.POST)
       if form.is_valid():
         user = form.save()  # Saves user to the database
         login(request, user)  # Automatically logs in the user
       return redirect("previous-orders")  # Redirect to previous order after registration
     else:
      form = RegisterForm()

     return render(request, "register.html", {"form": form})

@login_required
def previous_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-order_date')
    return render(request, 'previous-orders.html', {'orders': orders})

ORDER_HISTORY = []  # loop for order history


def make_pizza(request):
     if request.method == "POST":
        size = request.POST.get("size")
        quantity = request.POST.get("quantity")
        base = request.POST.get("base")
        cheese = request.POST.getlist("cheese")
        toppings = request.POST.getlist("toppings")

        context = {
            "size": size,
            "quantity": quantity,
            "base": base,
            "cheese": cheese,
            "toppings": toppings,
        }

        return render(request, "pizza_summary.html", context)
    
     return render(request, "make_pizza.html")


def place_order(request):
   if request.method == "POST":
        size = request.POST.get("size")
        quantity = request.POST.get('quantity', 1) 
        return redirect(f'/payment/?size={size}&quantity={quantity}')  # Pass to payment

   return render(request, 'make_pizza.html')
   
@login_required
def process_payment(request):
    if request.method == "POST":
        card_number = request.POST.get('card_number')
        expiry_date = request.POST.get('expiry_date')
        cvv = request.POST.get('cvv')

        if card_number and expiry_date and cvv:
            # Simulate successful payment processing
            return HttpResponse(f"Payment Successful! Card: {card_number} Expiry: {expiry_date} CVV: {cvv}")
        else:
            return HttpResponse("Payment Failed. Invalid details.")

    return render(request, 'payment.html')

    
from django.shortcuts import render

def pizza_summary(request):
    return render(request, "pizza_summary.html")  
