import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(115), // Increased height
        child: AppBar(
          backgroundColor: const Color(0xFFFFFFFF),
          elevation: 5,
          shadowColor: Colors.black.withOpacity(0.60),
          centerTitle: true,
          leading: Builder(
            builder: (context) => IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                _scaffoldKey.currentState?.openDrawer(); // Open the drawer
              },
            ),
          ),
          actions: [
            Padding(
              padding: const EdgeInsets.only(top: 15, right: 10),
              child: IconButton(
                icon: const Icon(Icons.person),
                onPressed: () {},
              ),
            ),
          ],
          title: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset(
                'assets/logo.png',
                height: 50,
              ),
              const SizedBox(width: 8),
            ],
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(20),
            child: Padding(
              padding: const EdgeInsets.only(bottom: 5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Services',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Feedback',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Contact Us',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: const Center(
        child: Text(
          '“ Empower your productivity: Streamline your Task with Ease “',
          style: TextStyle(fontSize: 11),
        ),
      ),
      drawer: Drawer(
        child: Column(
          children: [
            Container(
              height: 150,
              alignment: Alignment.center,
              padding: const EdgeInsets.only(top: 20),
              child: Image.asset(
                'assets/logo.png',
                height: 50,
              ),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: <Widget>[
                  ListTile(
                    leading: const Icon(Icons.dashboard),
                    title: const Text(
                      'Dashboard',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Dashboard here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.work),
                    title: const Text(
                      'Projects',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Projects here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.rss_feed),
                    title: const Text(
                      'Feeds',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Feeds here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.assignment),
                    title: const Text(
                      'Task',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Task here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.group),
                    title: const Text(
                      'Groups',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Groups here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.bar_chart),
                    title: const Text(
                      'Reports',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Reports here
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.calendar_today),
                    title: const Text(
                      'Calendar',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF333333),
                      ),
                    ),
                    onTap: () {
                      // Add functionality for Calendar here
                    },
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.logout), // Add icon to the left
              title: const Text(
                'Logout',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF333333),
                ),
              ),
              onTap: () {
                // Add functionality for Logout here
              },
            ),
          ],
        ),
      ),
    );
  }
}
