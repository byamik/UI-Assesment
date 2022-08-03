window.onload = function() {
    let addButtonEvent = document.querySelector("button.add");
    addButtonEvent.addEventListener("click", addPeople);
    let submitButtonEvent = document.querySelector("button[type=submit]");
    submitButtonEvent.addEventListener("click", list);
}

// Get Age
function getAgeValue() {
    let ageInputValue = document.querySelector("input[name=age]");
    let age = Number(ageInputValue.value);
    return age;
}


// Get relationship
function getRelationshipValue() {
    let selectedRelationshipValue = document.querySelector("select[name=rel]");
    let relationship = selectedRelationshipValue.value;
    return relationship;
}


// Get checkbox
function smoking() {
    let smokerInputValue = document.querySelector("input[name=smoker]");
    return smokerInputValue.checked;
}

function addPeople(event) {
    event.preventDefault();
    let age = getAgeValue();
    if (age <= 0 || isNaN(age)) {
        alert("Enter valid age.");
        return;
    }

    let relationship = getRelationshipValue();
    if (relationship === "") {
        alert("Select a relationship");
        return;
    }

    let smoker = smoking() ? "smoker" : "non-smoker";

    let li = document.createElement("li");
    li.textContent = relationship + " " + age + " " + smoker + " ";

    let people = document.querySelector("ol.household");

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "clear";

    button.addEventListener("click", function() { this.parentNode.remove(); });

    li.appendChild(button);

    people.appendChild(li);
    document.getElementById('age').value = ""
    document.getElementById('rel').value = ""
    document.getElementById('smoker').checked = false
}


function list(event) {
    event.preventDefault();
    let people = document.querySelector("ol.household");

    let householdMembers = { household: [] };
    for (let i = 0; i < people.children.length; ++i) {
        person = people.children[i].textContent.split(" ");
        member = {};
        member.relationship = person[0];
        member.age          = Number(person[1]);
        member.smoker       = person[2] === "smoker";

        householdMembers.household.push(member);
    }

    let debugValues = document.querySelector("pre.debug");
    debugValues.style.display = "block";
    debugValues.textContent = JSON.stringify(householdMembers, null, 2);
}